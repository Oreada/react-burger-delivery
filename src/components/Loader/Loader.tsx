import classNames from "classnames";
import style from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={style['backdrop']}>
      <div className={style['loader-wrapper']}>
        <div className={style['loader']}></div>
        <div className={classNames(style['loader-section'], style['section-left'])}></div>
        <div className={classNames(style['loader-section'], style['section-right'])}></div>
      </div>
    </div>
  );
};
