/**
 *
 * Lists
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Form from 'components/FormAddList';
import selectBoardListsOrderedByPos from './selectors';
import reducer from './reducer';
import { changePosList, addList } from './actions';
import saga from './saga';

import ListsCanvas from './ListsCanvas';

import DraggableLists from './DraggableLists';
export function Lists({ idBoard, lists, onAddList, onChangePosList }) {
  useInjectReducer({ key: 'allLists', reducer });
  useInjectSaga({ key: 'allLists', saga });

  return (
    <ListsCanvas>
      <DraggableLists lists={lists} onChangePosList={onChangePosList} />
      <Form idBoard={idBoard} submitHandler={onAddList} />
    </ListsCanvas>
  );
}

Lists.propTypes = {
  idBoard: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  onAddList: PropTypes.func.isRequired,
  onChangePosList: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    lists: selectBoardListsOrderedByPos(props.idBoard),
  });

const mapDispatchToProps = dispatch => ({
  onAddList: (title, idBoard) => dispatch(addList(title, idBoard)),
  onChangePosList: (lists, source, destination) =>
    dispatch(changePosList(lists, source, destination)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Lists);
