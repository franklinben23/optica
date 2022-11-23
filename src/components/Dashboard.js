import React, { useRef, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToFormattedText from "html-to-formatted-text";
import ReactToPrint from 'react-to-print';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './dashboard.css'

export const Dashboard = () =>{
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    return setEditorState(editorState)
  }

  const njdwj = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  // const text = convert(njdwj, {
  //   wordwrap: 130
  // });
  console.log(htmlToFormattedText(njdwj))

  const thisRef = useRef(null);

  return (
    <div className='cont'>
        <div className='inner-cont'>
            <div className='left-cont'>
              <div className='top-div'>FUNVI<strong>PRECE</strong></div>
              <div className='mid-div'> 
                <p>fundacion para la vision y prevencion de la ceguera</p>
              </div>
            </div>
            <div className='right-cont'>
              <div className='top-filters d-flex'>
                <div className='filter'>
                  <p className='filter-tag'>Full name/Nombre completo</p>
                  <input type='text' className='filter-input input-1' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className='filter'>
                  <p className='filter-tag'>Age/Edad</p>
                  <input type='number' className='filter-input input-2' value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                </div>
                <div className='filter'>
                  <p className='filter-tag'>Date/Fecha</p>
                  <input type='date' className='filter-input input-3' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                </div>
              </div>
              <div className='text-editor-cont'>
                <Editor
                ref={thisRef}
                editorState={editorState}
                toolbarOnFocus
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    bold: { className: 'bordered-option-classname' },
                    italic: { className: 'bordered-option-classname' },
                    underline: { className: 'bordered-option-classname' },
                    strikethrough: { className: 'bordered-option-classname' },
                    code: { className: 'bordered-option-classname' },
                  },
                  blockType: {
                    className: 'bordered-option-classname',
                  },
                  fontSize: {
                    className: 'bordered-option-classname',
                  },
                  fontFamily: {
                    className: 'bordered-option-classname',
                  },
                }}
                wrapperClassName="demo-wrapper"
                toolbarClassName="toolbar"
                editorClassName="editor-class"
                onEditorStateChange={onEditorStateChange}
                />
              </div>
              <ReactToPrint
              trigger={()=> {return <button className='print-btn'>Imprimir</button> }}
              content={()=> thisRef.current}
              />
            </div>
        </div>
    </div>
  )
};