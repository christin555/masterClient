import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import s from './Burger.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import MenuIcon from '@material-ui/icons/Menu';
import {Divider, IconButton} from '@material-ui/core';
import TextField from '../TextField';
import SearchIcon from '@material-ui/icons/Search';

const Burger = ({pathname, menu, toPage, search, setParams, setSearch}) => {
  const [state, setState] = React.useState({
    isOpen: false
  });

  const setOpen = (isOpen) => {
    setState({isOpen});
  };

  const toPageWithClose = (link) => {
    setOpen(false);
    toPage(link);
  };

  return (
    <div className={s.menuContainer}>
      <IconButton size={'small'} className={s.burgerIcon} onClick={() => setOpen(true)}> <MenuIcon
        className={s.burgerIcon}
      />
      </IconButton>
      <Drawer anchor={'right'} open={state.isOpen} onClose={() => setOpen(false)}>
        <div className={s.menu}>
          <div>
            <div className={s.header}>
              <div> Меню</div>
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
            <Divider className={s.divider} />
            <div className={s.search}>
              <TextField
                placeholder={'Поиск'}
                value={search}
                onChange={setSearch}
              />
              <SearchIcon onClick={setParams} />
            </div>
            {
              menu.map(({name, important, link}, index) => (
                <div
                  key={`${link}${index}`}
                  className={classNames({
                    [s.important]: important,
                    [s.isActive]: link === pathname
                  })}
                  onClick={() => toPageWithClose(link)}
                >
                  {name}
                </div>
              ))
            }
          </div>

          <div className={s.footer}>
            <div className={s.phone}>
              <PhoneIcon className={s.iconContact} />
                            +7 (982) 988-15-22
            </div>
            <a
              target={'_blank'}
              rel='noopener noreferrer'
              className={s.address}
              href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
            >
              <PlaceIcon className={s.iconContact} />
                            г. Тюмень, ул. Федюнинского д. 62 к. 1
            </a>
          </div>

        </div>
      </Drawer>
    </div>
  );
};

export default Burger;
