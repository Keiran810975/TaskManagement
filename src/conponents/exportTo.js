import React from 'react';
import { saveAs } from 'file-saver';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

function ExportToMarkdown() {
  const exportTasksToMarkdown = () => {
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate') || '{}');
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate') || '{}');

    let markdownContent = '';

    Object.keys(tasksByDate).forEach((date) => {
      markdownContent += `# ${date}\n\n`;
      tasksByDate[date].forEach((task, index) => {
        const completed = completedTasksByDate[date] && completedTasksByDate[date][index];
        const taskStatus = completed ? '~~' : '';
        markdownContent += `- ${taskStatus}${task}${taskStatus}\n`;
      });
      markdownContent += '\n';
    });

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, 'tasks.md');
  };

  return (
    <button
      onClick={exportTasksToMarkdown}
      style={{
        backgroundColor: '#F4D03F',
        backgroundImage: 'linear-gradient(256deg, #F4D03F 0%, #16A085 100%)',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
      }}
    >
      <FormatColorTextIcon style={{ marginRight: '10px', color: 'white' }} />
      导出为 Markdown
    </button>
  );
}

function ExportToTxt() {
  const exportTasksToTxt = () => {
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate') || '{}');
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate') || '{}');

    let txtContent = '';

    Object.keys(tasksByDate).forEach((date) => {
      txtContent += `${date}\n\n`;
      tasksByDate[date].forEach((task, index) => {
        const completed = completedTasksByDate[date] && completedTasksByDate[date][index];
        const taskStatus = completed ? '[Completed] ' : '';
        txtContent += `- ${taskStatus}${task}\n`;
      });
      txtContent += '\n';
    });

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'tasks.txt');
  };

  return (
    <button
      onClick={exportTasksToTxt}
      style={{
        backgroundColor: '#F4D03F',
        backgroundImage: 'linear-gradient(256deg, #F4D03F 0%, #16A085 100%)',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
      }}
    >
      <FormatColorTextIcon style={{ marginRight: '10px', color: 'white' }} />
      导出为 TXT
    </button>
  );
}

function ExportToWord() {
  const exportTasksToWord = () => {
    const tasksByDate = JSON.parse(localStorage.getItem('tasksByDate') || '{}');
    const completedTasksByDate = JSON.parse(localStorage.getItem('completedTasksByDate') || '{}');

    let wordContent = '';

    Object.keys(tasksByDate).forEach((date) => {
      wordContent += `${date}\n\n`;
      tasksByDate[date].forEach((task, index) => {
        const completed = completedTasksByDate[date] && completedTasksByDate[date][index];
        const taskStatus = completed ? '[Completed] ' : '';
        wordContent += `- ${taskStatus}${task}\n`;
      });
      wordContent += '\n';
    });

    const blob = new Blob([wordContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' });
    saveAs(blob, 'tasks.docx');
  };

  return (
    <button
      onClick={exportTasksToWord}
      style={{
        backgroundColor: '#F4D03F',
        backgroundImage: 'linear-gradient(256deg, #F4D03F 0%, #16A085 100%)',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
      }}
    >
      <FormatColorTextIcon style={{ marginRight: '10px', color: 'white' }} />
      导出为 Word
    </button>
  );
}

function ExportButtons() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ExportToMarkdown />
      <ExportToTxt />
      <ExportToWord />
    </div>
  );
}

export default ExportButtons;
