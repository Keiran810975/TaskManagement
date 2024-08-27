import React from 'react';
import ExportToMarkdown from '../conponents/exportTo';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Export = () => {
  const styles = {
    body: {
      height: '100vh',
      margin: '0',
      overflow: 'hidden', // 防止出现滚动条
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    },
    introduction: {
      flex: '1',
      marginBottom: '20px',
    },
    introductionTitle: {
      fontSize: '2em',
      marginBottom: '0.5em',
    },
    introductionText: {
      fontSize: '1em',
      color: '#666',
    },
    iconContainer: {
      marginBottom: '30px',
    },
    icon: {
      fontSize: '20rem',
      color: 'grey',
    },
    exportComponent: {
      flex: '1',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.introduction}>
          <h1 style={styles.introductionTitle}>导出你的任务列表</h1>
          <p style={styles.introductionText}>把你的任务列表导出为文档，方便你离线查看或与他人分享。</p>
          <div style={styles.iconContainer}>
            <FileUploadIcon style={styles.icon} />
          </div>
        </div>
        <div style={styles.exportComponent}>
          <ExportToMarkdown />
        </div>
      </div>
    </div>
  );
};

export default Export;
