import React from 'react';
import s from './Content.module.scss';
import {TablePagination} from '@material-ui/core';
import Cards from '../../../shared/Cards';
import {inject} from 'mobx-react';
import EmptyBlock from '../../../shared/EmptyBlock';
import {status as statusEnum} from '../../../enums';
import Chips from './Chips';
import Hierarchy from '../../../shared/Hierarchy';

const plural = require('plural-ru');

@inject(({CatalogStore}) => {
  return {
    cards: CatalogStore.cards || [],
    isLastLevel: CatalogStore.isLastLevel,
    count: CatalogStore.count,
    setOffset: CatalogStore.setOffset,
    setLimit: CatalogStore.setLimit,
    offset: CatalogStore.offset,
    limit: CatalogStore.limit,
    status: CatalogStore.status,
    isFastFilterEnabled: CatalogStore.isFastFilterEnabled,
    hierarchy: CatalogStore.hierarchy || []
  };
})
class Content extends React.Component {
  get label() {
    const {
      count
    } = this.props;

    const pluralLabel = plural(
      count,
      'товар',
      'товара',
      'товаров'
    );

    return `${count} ${pluralLabel}`;
  }

    getPagination = (withCount) => {
      const {
        isLastLevel,
        isFastFilterEnabled,
        count,
        setOffset,
        setLimit,
        offset,
        limit,
        hierarchy
      } = this.props;

      return (isLastLevel || isFastFilterEnabled) && (
        <div className={s.header}>
          <div className={s.count}>
            {this.label}
          </div>
          {
            <TablePagination
              labelDisplayedRows={({
                from,
                to,
                count
              }) => `${from}-${to} из ${count !== -1 ? count : `больше ${to}`}`}
              className={s.pagnt}
              labelRowsPerPage={null}
              rowsPerPageOptions={[10, 20, 50]}
              component='div'
              count={count}
              page={offset}
              onPageChange={setOffset}
              rowsPerPage={limit}
              onRowsPerPageChange={setLimit}
            />
          }
        </div>
      ) ||
        null;
    }

    render() {
      const {cards, status, isLastLevel, hierarchy} = this.props;

      if (!cards.length && status !== statusEnum.LOADING) {
        return <EmptyBlock />;
      }

      return (
        <div className={s.content}>
          <Hierarchy hierarchy={hierarchy} />
          {this.getPagination(true)}
          <Chips />
          <div className={s.cards}>
            <Cards items={cards} withPhone={isLastLevel} />
          </div>
        </div>
      );
    }
}

export default Content;
