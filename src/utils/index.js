import React from 'react';
import {
  Tooltip
} from 'antd';
import {
  YOUTUBE, REDDIT, LINKEDIN, TWITTER
} from '../const';

export const generateCols = (social, watchBtn, deleteBtn, commentBtn, profileBtn, moreBtn, contactBtn) => {
  const data = [
    { title: 'Age', dataIndex: 'pred_age', key: 'pred_age' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
  ];
  switch (social) {
    case YOUTUBE:
      data.push(
        {
          title: 'Comment', dataIndex: 'user_comment', key: 'user_comment', render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
          title: '',
          dataIndex: '',
          key: 'actionBtn',
          className: 'actionCol',
          render: (text, record) => <div className="icons-list">{watchBtn(record)}{deleteBtn(record)}{commentBtn(record)}{profileBtn(record)}{moreBtn(record)} </div>
        }
      );
      break;
    case REDDIT:
      data.push(
        {
          title: 'Comment', dataIndex: 'comment_text', key: 'comment_text', render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
          title: '',
          dataIndex: '',
          key: 'actionBtn',
          className: 'actionCol',
          render: (text, record) => <div className="icons-list">{watchBtn(record)}{deleteBtn(record)}{commentBtn(record)}{profileBtn(record)}{moreBtn(record)} </div>
        }
      );
      break;
    case LINKEDIN:
      data.push(
        {
          title: 'Industry', dataIndex: 'industry', key: 'industry'
        },
        {
          title: '',
          dataIndex: '',
          key: 'actionBtn',
          className: 'actionCol',
          render: (text, record) => <div className="icons-list">{watchBtn(record)}{deleteBtn(record)}{profileBtn(record)}{moreBtn(record)} </div>
        }
      );
      break;
    case TWITTER:
      data.push(
        {
          title: 'Tweet', dataIndex: 'tweet_text', key: 'tweet_text', render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
          title: '',
          dataIndex: '',
          key: 'actionBtn',
          className: 'actionCol',
          render: (text, record) => <div className="icons-list">{watchBtn(record)}{deleteBtn(record)}{commentBtn(record)}{profileBtn(record)}{moreBtn(record)} </div>
        }
      );
      break;
    default:
      // watchlist table
      data.unshift({
        title: 'Contact', dataIndex: 'contacted', key: 'contacted', render: (text, record) => contactBtn(record)
      });
      data.push(
        {
          title: 'Comment',
          dataIndex: 'comment_text',
          key: 'comment_text',
          render: (text, record) => {
            const commentText = record.comment_text || record.user_comment || record.tweet_text;
            return <Tooltip placement="topLeft" title={commentText}>{commentText}</Tooltip>;
          }
        },
        {
          title: '',
          dataIndex: '',
          key: 'actionBtn',
          className: 'actionCol',
          render: (text, record) => <div className="icons-list">{watchBtn(record)}{deleteBtn(record)}{commentBtn(record)}{profileBtn(record)}{moreBtn(record)} </div>
        }
      );
  }
  return data;
};
