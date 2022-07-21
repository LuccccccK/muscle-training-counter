// 参考：https://qiita.com/wakeupsloth/items/6778df1e984f55c446e9
import React, { useState } from 'react';

// Import UI Component
import { Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

export const SWUpdateDialog: React.FC<{ registration: ServiceWorkerRegistration }> = ({ registration }) => {
  // todo: !!registration.waiting が何をしているのかよくわかっていない...
  const [open, setOpen] = useState(!!registration.waiting);
  const style: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'green',
  };
  const handleUpdate = () => {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"アプリ バージョン更新のお知らせ"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          MTC - Muscle Training Count アプリのバージョンが更新されました
          更新を反映するため、「Upadte」ボタンを押下してください
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
};