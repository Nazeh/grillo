import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from 'components/List';
import { useSelector, useDispatch } from 'react-redux';
import { changePosCard } from 'containers/Cards/actions';
import { selectCardsDomain } from 'containers/Cards/selectors';
import _ from 'lodash';
import getNewPos from 'utils/lib/getNewPos';
import Cards from 'containers/Cards';
import { changePosList } from './actions';

const ListWrapper = styled.div`
  display: flex;
`;

const DraggableLists = ({ lists }) => {
  const dispatch = useDispatch();
  const allCards = useSelector(selectCardsDomain);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    if (
      destination === null ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (result.type === 'list') {
      dispatch(
        changePosList({
          idList: draggableId,
          newPos: getNewPos(lists, source, destination),
        }),
      );
    } else {
      const idList = destination.droppableId;
      const cards = _.filter(allCards, card => card.idList === idList);
      const sortedCards = _.sortBy(cards, card => card.pos);

      dispatch(
        changePosCard({
          idList,
          idCard: draggableId,
          newPos: getNewPos(sortedCards, source, destination),
        }),
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="all-droppables"
        direction="horizontal"
        type="list"
      >
        {provided => (
          <ListWrapper {...provided.droppableProps} ref={provided.innerRef}>
            {lists.map((list, index) => (
              <List key={list.id} list={list} draggableIndex={index}>
                <Cards idList={list.id} idBoard={list.idBoard} />
              </List>
            ))}
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DraggableLists.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default DraggableLists;
