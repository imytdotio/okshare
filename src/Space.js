import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentBlocks from './components/ContentBlocks';
import InputModal from './components/InputModal';
import ConfirmationModal from './components/ConfirmationModal';
import { supabase } from './supabaseClient/supabaseClient';

const Space = () => {
  const { spaceId } = useParams();
  const [contents, setContents] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (spaceId) {
      fetchContent(spaceId);
    }
  }, [spaceId]);

  const fetchContent = async (spaceId) => {
    const { data, error } = await supabase
      .from('media')
      .select('content, type')
      .eq('space', spaceId);

    if (error) {
      console.error('Error fetching content:', error);
      return;
    }

    if (data.length === 0) {
      setShowInputModal(true);
    } else {
      setContents(data.map(item => ({ content: item.content, type: item.type })));
    }
  };

  const addContent = async (content, type) => {
    const { error } = await supabase
      .from('media')
      .insert([{ space: spaceId, content, type }]);

    if (error) {
      console.error('Error adding content:', error);
      return;
    }

    fetchContent(spaceId);
  };

  const deleteAllContent = async () => {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('space', spaceId);

    if (error) {
      console.error('Error deleting content:', error);
      return;
    }

    setContents([]);
  };

  const handleAddClick = () => {
    setShowInputModal(true);
  };

  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };

  return (
    <div className="bg-[#f1f5f9] py-4 flex flex-col justify-between">
      <div>
        <ContentBlocks contents={contents} onAddClick={handleAddClick} />
        <button
          className="w-full border border-red-500 text-red-500 p-2 mt-4 rounded-3xl"
          onClick={handleDeleteClick}
        >
          Delete All Content in This Space
        </button>
        {showInputModal && (
          <InputModal
            onAddContent={addContent}
            onClose={() => setShowInputModal(false)}
          />
        )}
        {showConfirmationModal && (
          <ConfirmationModal
            onConfirm={deleteAllContent}
            onClose={() => setShowConfirmationModal(false)}
          />
        )}
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center px-2">
        Disclaimer: If another person enters the same ID, they can access the content. Please do not put important or personal information on OK Share.
      </p>
    </div>
  );
};

export default Space;
