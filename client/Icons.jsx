/* eslint-disable react/prop-types */
import React from 'react';


const CalIcon = ({
  width = '18',
  height = '18',
  id = 'CalIcon',
  viewBox = '0 0 18 18',
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
  viewBox = '0 0 18 18',
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
  viewBox = '0 0 18 18',
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
  viewBox = '0 0 14 14',
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

const ClosingIcon = ({
  width = '24',
  height = '24',
  id = 'ClosingIcon',
  viewBox = '0 0 24 24',
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M17.657 19.07L12 13.415 6.343 19.07 4.93 17.658 10.585 12 4.93 6.343 6.342 4.93 12 10.585l5.657-5.657L19.07 6.34 13.416 12l5.657 5.657-1.413 1.414z"
    />
  </svg>
);

const LeftIcon = ({
  width = '24',
  height = '24',
  id = 'LeftIcon',
  viewBox = '0 0 24 24',
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M14.475 18.364l1.414-1.414L10.94 12l4.95-4.95-1.415-1.414L8.11 12l6.365 6.364z"
    />
  </svg>
);

const RightIcon = ({
  width = '24',
  height = '24',
  id = 'RightIcon',
  viewBox = '0 0 24 24',
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <path
      d="M9.525 5.636L8.11 7.05 13.06 12l-4.95 4.95 1.415 1.414L15.89 12 9.524 5.636z"
    />
  </svg>
);

const YelpIcon = ({
  width = '50',
  height = '50',
  id = 'YelpIcon',
  viewBox = '-7 0 30 30',
}) => (
  <svg
    id={id}
    height={height}
    width={width}
    viewBox={viewBox}
  >
    <g>
      <path
        stroke="#fff"
        strokeWidth="4"
        d="M18.803 12.49l-4.162 1.194c-.8.23-1.45-.666-.98-1.357l2.42-3.59a.893.893 0 0 1 1.33-.172 7.66 7.66 0 0 1 1.97 2.71.894.894 0 0 1-.572 1.215zm-4.187 2.627l4.117 1.338a.893.893 0 0 1 .53 1.233 7.762 7.762 0 0 1-2.058 2.64.894.894 0 0 1-1.326-.216l-2.3-3.674c-.44-.706.24-1.578 1.03-1.32zm-3.996-3.64l-4.07-7.05a.893.893 0 0 1 .388-1.25A12.475 12.475 0 0 1 11.324 2c.518-.04.96.37.96.89v8.138c0 .913-1.208 1.236-1.664.446zm-.714 3.475L5.704 16a.894.894 0 0 1-1.103-.767 7.68 7.68 0 0 1 .358-3.33.892.892 0 0 1 1.237-.516l3.89 1.898c.75.365.635 1.466-.173 1.667zm.738 1.23c.557-.62 1.584-.205 1.555.627l-.158 4.322c-.02.54-.51.94-1.04.85A7.76 7.76 0 0 1 7.9 20.73a.893.893 0 0 1-.156-1.333l2.897-3.22z"
      />
      <path
        fill="#d32323"
        d="M18.803 12.49l-4.162 1.194c-.8.23-1.45-.666-.98-1.357l2.42-3.59a.893.893 0 0 1 1.33-.172 7.66 7.66 0 0 1 1.97 2.71.894.894 0 0 1-.572 1.215zm-4.187 2.627l4.117 1.338a.893.893 0 0 1 .53 1.233 7.762 7.762 0 0 1-2.058 2.64.894.894 0 0 1-1.326-.216l-2.3-3.674c-.44-.706.24-1.578 1.03-1.32zm-3.996-3.64l-4.07-7.05a.893.893 0 0 1 .388-1.25A12.475 12.475 0 0 1 11.324 2c.518-.04.96.37.96.89v8.138c0 .913-1.208 1.236-1.664.446zm-.714 3.475L5.704 16a.894.894 0 0 1-1.103-.767 7.68 7.68 0 0 1 .358-3.33.892.892 0 0 1 1.237-.516l3.89 1.898c.75.365.635 1.466-.173 1.667zm.738 1.23c.557-.62 1.584-.205 1.555.627l-.158 4.322c-.02.54-.51.94-1.04.85A7.76 7.76 0 0 1 7.9 20.73a.893.893 0 0 1-.156-1.333l2.897-3.22z"
      />
    </g>
  </svg>
);


export default {
  ClockIcon,
  CalIcon,
  PeopleIcon,
  TriangleDown,
  ClosingIcon,
  LeftIcon,
  RightIcon,
  YelpIcon,
};
