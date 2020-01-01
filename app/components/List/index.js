/**
 *
 * List
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Cards from 'containers/Cards';
import { Draggable } from 'react-beautiful-dnd';
import ListTitle from './ListTitle';

import Wrapper from './ListWrapper';

function List({ list, draggableIndex }) {
  const { title, id } = list;

  return (
    <Draggable draggableId={id} index={draggableIndex}>
      {provided => (
        <Wrapper
          component="article"
          elevation={4}
          className="list"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ListTitle>{title}</ListTitle>
          <Cards idList={id} />
        </Wrapper>
      )}
    </Draggable>
  );
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  draggableIndex: PropTypes.number,
};

export default memo(List);
