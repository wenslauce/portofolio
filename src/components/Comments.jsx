import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Comments() {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initial fetch of comments
    fetchComments()
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('comments')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments' },
        payload => {
          if (payload.eventType === 'INSERT') {
            setComments(prev => [payload.new, ...prev])
          }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            message: newComment,
            user_id: user.id,
            username: user.user_metadata.full_name || user.email,
            profile_url: user.user_metadata.avatar_url
          }
        ])

      if (error) throw error
      setNewComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-gray-200"
          rows="3"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg text-white font-medium disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-2">
              {comment.profile_url && (
                <img
                  src={comment.profile_url}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <p className="text-gray-200 font-medium">{comment.username}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-300">{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 