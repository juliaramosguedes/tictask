import React from 'react';
import { css, cx } from 'emotion';
import { Tooltip, TooltipReference, useTooltipState } from 'reakit/Tooltip';
import { default as Icon } from '../icon';
import { ColorNeutralDarker } from '../../tokens';

const InfoIcon = () => (
  <Icon.SvgInfoCircleBold
    className={cx(
      'info-icon',
      css`
        height: auto;
        margin-left: 4px;
        margin-top: -3px;
        width: 16px;

        path {
          stroke: ${ColorNeutralDarker};
        }
      `
    )}
  />
);

const TooltipInfo = (props) => (
  <Tooltip
    {...props}
    className={cx(
      'tooltip-info',
      css`
        background: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        color: white;
        padding: 16px;
      `,
      props.className
    )}
  />
);

const FieldInfo = ({ children, ...props }) => {
  const tooltip = useTooltipState();

  return (
    <>
      <TooltipReference {...tooltip} as="span">
        <InfoIcon />
      </TooltipReference>
      <TooltipInfo {...tooltip}>{children}</TooltipInfo>
    </>
  );
};

export default FieldInfo;
