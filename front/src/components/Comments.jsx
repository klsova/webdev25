import './Comments.css';

const Comments = () => {
    return (
        <div className='comments-container'>
            <form action="/action_page.php">
              <label for="fname">First name:</label>
              <input type="text" id="fname" name="fname" /><br /><br />
                <label for="lname">Last name:</label>
                <input type="text" id="lname" name="lname" /><br /><br />
                <input type="submit" value="Submit" />
            </form>
            <div className='comment-box'>
                <p>Tähän kommenttilaatkko</p>
            </div>
        </div>
    );
}

export default Comments;