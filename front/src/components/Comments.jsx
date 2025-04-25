import { useState, useEffect } from 'react';
import axios from 'axios';
import './Comments.css';

const Comments = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await axios.get("http://localhost:3001/comments/");
        setAllComments(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/comments/", {
                name,
                comment
            });
            setName('');
            setComment('');
            fetchComments();
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    return (
        <div className='comments-container'>
            <h3>Comments</h3>
            <div className='comment-box'>
                {allComments.map((c) => (
                    <div key={c._id}>
                        <p>
                            <small>({new Date(c.createdAt).toLocaleString()})</small>
                            <strong> {c.name}:</strong><br />
                            {c.comment}
                        </p>
                    </div>
                ))}
            </div>
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/><br /><br />
                <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment here..."/><br /><br />
                <input type="submit" value="Post comment" />
            </form>
        </div>
    );
};

export default Comments;
