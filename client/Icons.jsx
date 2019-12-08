import React from 'react';


const CalIcon = ({
  width = '18',
  height = '18',
  id = 'CalIcon',
  viewBox = '0 0 18 18'
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M13.6 16H4.4C3.077 16 2 14.88 2 13.5v-9C2 3.12 3.077 2 4.4 2H5a1 1 0 0 1 2 0h4a1 1 0 0 1 2 0h.6C14.923 2 16 3.12 16 4.5v9c0 1.38-1.077 2.5-2.4 2.5zM15 7H3v6.5c0 .828.627 1.5 1.4 1.5h9.2c.773 0 1.4-.672 1.4-1.5V7zm-5 3h3v3h-3v-3z"
    />
  </svg>
);

const ClockIcon = ({
  width = '18',
  height = '18',
  id = 'ClockIcon',
  viewBox = '0 0 18 18'
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M9 17A8 8 0 1 1 9 1a8 8 0 0 1 0 16zM9 2C5.14 2 2 5.14 2 9s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm3.223 10.098a.998.998 0 0 1-.588-.192L8 9.256V5a1 1 0 0 1 2 0v3.24l2.812 2.05a1 1 0 0 1-.59 1.808z"
    />
  </svg>
);

const PeopleIcon = ({
  width = '18',
  height = '18',
  id = 'PeopleIcon',
  viewBox = '0 0 18 18'
}) => (
  <span>
    <svg
      id={id}
      height={height}
      width={width}
      viewBox={viewBox}
    >
      <g>
        <path
          d="M7.904 9.43l-2.098 4.697a.9.9 0 0 1-1.612 0L2.096 9.43a.902.902 0 0 1 .806-1.305h4.196c.67 0 1.105.705.806 1.305zM5 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        />
        <path
          d="M15.904 9.43l-2.098 4.697a.89.89 0 0 1-.806.498.89.89 0 0 1-.806-.498L10.096 9.43a.902.902 0 0 1 .806-1.305h4.195c.67 0 1.106.705.807 1.305zM13 7.375a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          opacity=".5"
        />
      </g>
    </svg>
  </span>
);

const TriangleDown = ({
  width = '14',
  height = '14',
  id = 'TriangleDown',
  viewBox = '0 0 14 14'
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M7 9L3.5 5h7L7 9z"
    />
  </svg>
);


export default {
  ClockIcon,
  CalIcon,
  PeopleIcon,
  TriangleDown,
};
