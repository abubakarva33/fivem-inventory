import { useRef } from "react";
import { useDragLayer } from "react-dnd";

const subtract = (a, b) => {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
};

const calculateParentOffset = (monitor) => {
  const client = monitor.getInitialClientOffset();
  const source = monitor.getInitialSourceClientOffset();
  if (client === null || source === null || client.x === undefined || client.y === undefined) {
    return { x: 0, y: 0 };
  }
  return subtract(client, source);
};

const calculatePointerPosition = (monitor, childRef) => {
  const offset = monitor.getClientOffset();
  if (offset === null) {
    return null;
  }

  if (!childRef.current || !childRef.current.getBoundingClientRect) {
    return subtract(offset, calculateParentOffset(monitor));
  }

  const bb = childRef.current.getBoundingClientRect();
  const middle = { x: bb.width / 2, y: bb.height / 2 };
  return subtract(offset, middle);
};

const DragPreview = () => {
  const element = useRef(null);

  const { data, isDragging, currentOffset } = useDragLayer((monitor) => {
    return {
      data: monitor.getItem(),
      currentOffset: calculatePointerPosition(monitor, element),
      isDragging: monitor.isDragging(),
    };
  });

  return (
    <>
      {isDragging && currentOffset && data.item && (
        <div
          className="item-drag-preview z-[999]"
          ref={element}
          style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            backgroundImage: data.image,
          }}
        ></div>
      )}
    </>
  );
};

export default DragPreview;
