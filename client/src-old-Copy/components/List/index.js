import React from "react";


// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div>
      <ul>{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li>{children}</li>;
}
