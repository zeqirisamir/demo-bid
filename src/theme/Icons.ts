import React from 'react';
import back from '../assets/icons/back.svg';
import tick from '../assets/icons/tick.svg';
import calendar from '../assets/icons/calendar.svg';
import error from '../assets/icons/error.svg';
import info from '../assets/icons/info.svg';
import next from '../assets/icons/next.svg';
import close from '../assets/icons/close.svg';
import done from '../assets/icons/done.svg'

const Icons: IconsBox = {
  back,
  tick,
  calendar,
  error,
  next,
  info,
  close,
  done
};

export default Icons;

export type IconsBox = { [key in IconName]: React.ElementType };

export type IconName =
  | 'done'
  | 'back'
  | "tick"
  | 'calendar'
  | "error"
  | 'next'
  | 'info'
  | 'close'
