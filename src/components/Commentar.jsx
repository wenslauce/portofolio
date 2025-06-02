import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';

const Comment = memo(({ comment }) => (
    <div className="p-3 sm:p-4 bg-[#1a1a2e] rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex-shrink-0 flex items-center justify-center">
                {comment.profile_url ? (
                    <img
                        src={comment.profile_url}
                        alt={comment.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-white text-sm sm:text-lg font-medium">
                        {comment.name[0].toUpperCase()}
                    </span>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <p className="text-sm sm:text-base text-gray-200 font-medium bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent truncate">
                        {comment.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mt-1 break-words">
                    {comment.message}
                </p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, loading }) => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                Swal.fire({
                    title: 'File too large',
                    text: 'Please select an image under 5MB',
                    icon: 'error',
                    confirmButtonColor: '#6366f1'
                });
                return;
            }
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && message.trim()) {
            await onSubmit(name, message, profilePhoto);
            setName("");
            setMessage("");
            setProfilePhoto(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 bg-[#1a1a2e] p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white text-lg sm:text-xl">
                                {name ? name[0].toUpperCase() : "?"}
                            </span>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleProfilePhotoChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Choose profile photo"
                    />
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 w-full sm:w-auto bg-[#2a2a3e] text-gray-200 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-700 focus:outline-none focus:border-[#6366f1] transition-colors"
                    required
                    maxLength={50}
                />
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your comment..."
                className="w-full bg-[#2a2a3e] text-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-700 focus:outline-none focus:border-[#6366f1] transition-colors resize-none"
                rows="3"
                required
                maxLength={500}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading || !name.trim() || !message.trim()}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg text-white text-sm sm:text-base font-medium 
                             disabled:opacity-50 transform transition-all duration-200 hover:scale-105 
                             focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-opacity-50"
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <span className="animate-spin">⏳</span>
                            <span>Posting...</span>
                        </div>
                    ) : (
                        "Post Comment"
                    )}
                </button>
            </div>
        </form>
    );
});

const Commentar = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
        
        const subscription = supabase
            .channel('comments')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'comments' },
                payload => {
                    if (payload.eventType === 'INSERT') {
                        setComments(prev => [payload.new, ...prev]);
                    }
                })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load comments. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
        }
    };

    const handleSubmit = async (name, message, profilePhoto) => {
        setLoading(true);
        try {
            let profile_url = null;
            if (profilePhoto) {
                const fileExt = profilePhoto.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('profile-photos')
                    .upload(fileName, profilePhoto);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('profile-photos')
                    .getPublicUrl(fileName);
                
                profile_url = publicUrl;
            }

            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        name,
                        message,
                        profile_url
                    }
                ]);

            if (error) throw error;

            Swal.fire({
                title: 'Posted!',
                text: 'Your comment has been posted successfully!',
                icon: 'success',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error posting comment:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Failed to post comment. Please try again.',
                icon: 'error',
                confirmButtonColor: '#6366f1'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <CommentForm onSubmit={handleSubmit} loading={loading} />
            <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 max-h-[60vh] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1a1a2e;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #6366f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a855f7;
                }
            `}</style>
        </div>
    );
};

export default memo(Commentar);