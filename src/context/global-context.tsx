import React, { useContext, useState } from 'react';
import getLocalStorage from '../utils/get-local-storage';
import { ContextState, Video, Alert } from '../types';

const contextDefaultValues: ContextState = {
  video: { id: '', title: '' },
  setVideo: () => {},
  playlist: getLocalStorage(),
  setPlaylist: () => {},
  alert: { show: false, type: '', msg: '' },
  setAlert: () => {},
  showAlert: () => {},
  removeAlert: () => {},
  showForm: true,
  setShowForm: () => {},
  isEditing: false,
  setIsEditing: () => {},
  editID: '',
  setEditID: () => {},
};

const GlobalContext = React.createContext<ContextState>(contextDefaultValues);

const ContextProvider: React.FC = ({ children }) => {
  const [video, setVideo] = useState<Video>(contextDefaultValues.video);
  const [playlist, setPlaylist] = useState<Video[]>(
    contextDefaultValues.playlist
  );
  const [alert, setAlert] = useState<Alert>(contextDefaultValues.alert);
  const [showForm, setShowForm] = useState<boolean>(
    contextDefaultValues.showForm
  );
  const [editID, setEditID] = useState<string>(contextDefaultValues.editID);
  const [isEditing, setIsEditing] = useState<boolean>(
    contextDefaultValues.isEditing
  );

  const showAlert = ({ show = false, type = '', msg = '' }: Alert) => {
    setAlert({ show, type, msg });
  };
  const removeAlert = () => {
    setAlert(contextDefaultValues.alert);
  };

  return (
    <GlobalContext.Provider
      value={{
        video,
        setVideo,
        playlist,
        setPlaylist,
        alert,
        setAlert,
        showAlert,
        removeAlert,
        showForm,
        setShowForm,
        isEditing,
        setIsEditing,
        editID,
        setEditID,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { ContextProvider };
