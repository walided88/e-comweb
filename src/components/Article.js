import React from 'react';
import '../styles.css';

const Article = ({ title, author, date, image, content }) => {
    return (
        <div className="article">
            <h1 className="article-title">{title}</h1>
            <div className="article-meta">
                <span className="article-author">By {author}</span>
                <span className="article-date">{date}</span>
            </div>
            {image && <img src={require(`../images/1.png`)} alt={title} className="article-image" style={{width: '33%', height: 'auto'}} />}
            <p className="article-content">{content}</p>
        </div>
    );
};

export default Article;
