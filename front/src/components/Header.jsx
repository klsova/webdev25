import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-container'>
                <h1>Header</h1>
                <div className='search-box'>
                    <search></search>
                </div>
            </div>
        </div>
    );
}

export default Header;