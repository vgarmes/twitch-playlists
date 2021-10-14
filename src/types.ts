export type Video = {
  id: string;
  title: string;
};

export type Alert = {
  show: boolean;
  type: string;
  msg: string;
};

export type ContextState = {
  video: Video;
  setVideo: (video: Video) => void;
  playlist: Video[];
  setPlaylist: (playlist: Video[]) => void;
  alert: Alert;
  setAlert: (alert: Alert) => void;
  showAlert: (alert: Alert) => void;
  removeAlert: Function;
  showForm: boolean;
  setShowForm: (status: boolean) => void;
  isEditing: boolean;
  setIsEditing: (status: boolean) => void;
  editID: string;
  setEditID: (id: string) => void;
};
