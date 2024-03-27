// @ts-nocheck
import React, { useState, useEffect } from 'react';
export type StatusNotification = "error" | "success" | null;
import notification from  "./notification.module.css"
interface Props {
  status: StatusNotification
  msj: string | null
}


export const Notification = ({ status, msj }: Props) => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Cuando cambia el estado de visible, mostramos u ocultamos la notificación
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);

  }, []);


  return (
    <div className={`notification ${status} ${visible ? 'show' : 'hide'}`}>
      <p>{msj}</p>
    </div>
  )
}