/**
 *
 * CardItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  max-height: 100%;
  padding: 0 ${props => props.theme.spacing(2)}px;
`;

const CardItem = ({ card, dragHandleProps }) => {
  const { title } = card;

  return (
    <Wrapper component="article" variant="outlined" {...dragHandleProps}>
      <Typography variant="h6" component="h4">
        {title}
      </Typography>
    </Wrapper>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.shape({}).isRequired,
};

export default memo(CardItem);
