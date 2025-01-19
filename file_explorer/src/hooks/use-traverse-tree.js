const useTraverseTree = () =>{

    function insertNode(tree,folderId,item,isFolder) {
        if(tree.id === folderId && tree.isFolder){
            tree.items.unshift({
                id: new Date().getTime().toString(),
                name: item,
                isFolder,
                items: []
            })
            return tree
        }
        let latestNode = []
        latestNode = tree.items.map((ob) => {
            return insertNode(ob,folderId,item,isFolder)
        })   
        return {...tree ,items : latestNode}
    }
    const deleteNode = (tree,id) => {
        if (tree.id === id) {
            return null;
        }
          // Make sure we recursively return updated trees, not mutated trees
        const updatedItems = tree.items
        .map((item) => deleteNode(item, id)) // Recursively process the child items
        .filter((item) => item !== null); // Filter out null values (deleted items)

    return { ...tree, items: updatedItems };

    }
    const updateNode = (tree, id, newName) => {
        // Check if the current node is the one to be updated (both folder or file)
        if (tree.id === id) {
            return { ...tree, name: newName }; // Return a new object with the updated name
        }
    
        // If it's not the current node, recurse through the child items
        const updatedItems = tree.items.map((item) => updateNode(item, id, newName));
    
        // Return a new tree structure with the updated items
        return { ...tree, items: updatedItems };
    };
    
    return {insertNode , deleteNode , updateNode}
}

export default useTraverseTree