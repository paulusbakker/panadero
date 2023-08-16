import { useEffect } from 'react';

function useClickHandler(categoryNameRef, symbolRef, editButtonRef, editWindowRef, setActiveCategory, setEditWindowOpen, isEditWindowOpen) {
  useEffect(() => {
    function handleClick(event) {

      // Logic for symbol click.
      if (symbolRef.current && symbolRef.current.contains(event.target)) {
        const categoryName = categoryNameRef.current && categoryNameRef.current.textContent;

      }

      // Logic for category name click.
      else if (categoryNameRef.current && categoryNameRef.current.contains(event.target)) {
        if (!isEditWindowOpen) {
          setActiveCategory(null);
        }
      }

      // Logic for clicking on edit button.
      else if (editButtonRef.current && editButtonRef.current.contains(event.target)) {
        // Here, you might want to open some edit dialog/modal, but since you didn't provide the specific action, I'm leaving it blank.
      }

      // Logic for clicking outside edit window.
      else if (editWindowRef.current && !editWindowRef.current.contains(event.target)) {
        ;
      }
    }

    // Attach the click listener.
    document.addEventListener('mousedown', handleClick);

    // Cleanup on component unmount.
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, [categoryNameRef, symbolRef, editButtonRef, editWindowRef, setActiveCategory, setEditWindowOpen, isEditWindowOpen]);
}

export default useClickHandler;
