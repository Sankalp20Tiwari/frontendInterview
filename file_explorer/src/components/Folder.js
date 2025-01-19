import React, { useState } from 'react'

const Folder = ({ handleInsertNode,handleDeleteNode,handleRenameNode,explorer}) => {

  const [expand, setExpand] = useState(false)  
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
    isRenaming: false
  })

  const handleNewFolder= (e , isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  }

  const onAddFolder = (e) => {
    if(e.keyCode === 13 && e.target.value){
        //add logic
        handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
        setShowInput({...showInput, visible: false})
    }
  }

  const handleDelete = () => {
    //add logic
    handleDeleteNode(explorer.id)
  }

  const handleRename = (e) => {
    //add logic
    if(e.keyCode === 13 && e.target.value){
        handleRenameNode(explorer.id,e.target.value)
        setShowInput({ ...showInput, isRenaming: false });
    }
    }

  if(explorer.isFolder){
    return (
       
        <div>
          <div className='folder' onClick={() => setExpand(!expand)}> 
            <span>📁 {explorer.name}</span>
            <div>
                <button onClick={(e) => handleNewFolder(e,true)}>Folder +</button>
                <button onClick={(e) => handleNewFolder(e,false)}>File +</button>
                <button onClick = {handleDelete}>🗑</button>
                <button onClick = {() => setShowInput({ ...showInput, isRenaming: true })}>📝</button>
            </div>
          </div>
          <div style ={{display: expand ? 'block' : 'none', marginLeft: '20px'}}>
            {
              showInput.visible && (
                <div className='inputContainer'>
                    <span>{showInput.isFolder ? '📁' : '📄'}</span>
                    <input 
                      className='inputContainer__input' 
                      type="text" 
                      placeholder='Name'
                      autoFocus
                      onKeyDown={onAddFolder}
                      onBlur={() => setShowInput({...showInput, visible: false})}/>
                </div>
              )
            }
            {
              showInput.isRenaming && (
                <div className='inputContainer'>
                    <span>{showInput.isFolder ? '📁' : '📄'}</span>
                    <input 
                      className='inputContainer__input' 
                      type="text" 
                      defaultValue={explorer.name}
                      autoFocus
                      onKeyDown={handleRename}
                      onBlur={() => setShowInput({...showInput, isRenaming: false})}/>
                </div>
              )
            }
           {
             explorer.items.map((item) => {
                return <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleRenameNode={handleRenameNode} explorer={item} key={item.id} />;
             })
           }
          </div>
        </div>
      )
  }
  else{
    return (
      <div className='file'>
        <span>📄 {explorer.name}</span>
        <button onClick = {handleDelete}>🗑</button>
        <button onClick = {() => setShowInput({ ...showInput, isRenaming: true })}>📝</button>
        {showInput.isRenaming && (
          <div className="inputContainer">
            <span>📄</span>
            <input
              className="inputContainer__input"
              type="text"
              defaultValue={explorer.name}
              autoFocus
              onKeyDown={handleRename}
              onBlur={() => setShowInput({ ...showInput, isRenaming: false })}
            />
          </div>
        )}
      </div>
    )
  }
  
}

export default Folder
