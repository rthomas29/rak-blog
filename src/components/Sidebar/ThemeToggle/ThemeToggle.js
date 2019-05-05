import React from 'react'
import { css, jsx } from '@emotion/core'
/** @jsx jsx */
export const slider = css`
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;

  &:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  input:checked + & {
    background-color: #66bb6a;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }

  &.round {
    border-radius: 34px;
  }

  &.round:before {
    border-radius: 50%;
  }
`

export const themeSwitch = css`
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
  border-radius: 10px;

  & input {
    display: none;
  }
`

export const themeSwitchWrapper = css`
  display: flex;
  align-items: center;
`

const ThemeToggle = () => {
  return (
    <div class="theme-switch-wrapper" css={themeSwitchWrapper}>
      <label class="theme-switch" for="checkbox" css={themeSwitch}>
        <input type="checkbox" id="checkbox" />
        <div class="slider round" css={slider}></div>
      </label>
      <em>Enable Dark Mode!</em>
    </div>
  )
}

export default ThemeToggle