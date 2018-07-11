export class Location {
  static centerAbove(
    element: HTMLElement,
    box: HTMLElement,
    padding = 8
  ): string[] {
    const clientBoundingRect = element.getBoundingClientRect();
    const boxBoundingRect = box.getBoundingClientRect();
    const x =
      clientBoundingRect.width / 2 +
      clientBoundingRect.left -
      boxBoundingRect.width / 2;
    const y = clientBoundingRect.top - box.clientHeight - padding;
    return [`${x}px`, `${y}px`];
  }

  static centerBelow(
    element: HTMLElement,
    box: HTMLElement,
    padding = 8
  ): string[] {
    const clientBoundingRect = element.getBoundingClientRect();
    const boxBoundingRect = box.getBoundingClientRect();
    const x =
      clientBoundingRect.width / 2 +
      clientBoundingRect.left -
      boxBoundingRect.width / 2;
    const y = clientBoundingRect.bottom + padding;
    return [`${x}px`, `${y}px`];
  }

  static centerLeft(
    element: HTMLElement,
    box: HTMLElement,
    padding = 8
  ): string[] {
    const clientBoundingRect = element.getBoundingClientRect();
    const boxBoundingRect = box.getBoundingClientRect();
    const x = clientBoundingRect.left - (boxBoundingRect.width + padding);
    const y =
      clientBoundingRect.top +
      clientBoundingRect.height / 2 -
      boxBoundingRect.height / 2;
    return [`${x}px`, `${y}px`];
  }

  static centerRight(
    element: HTMLElement,
    box: HTMLElement,
    padding = 8
  ): string[] {
    const clientBoundingRect = element.getBoundingClientRect();
    const boxBoundingRect = box.getBoundingClientRect();
    const x = clientBoundingRect.right + padding;
    const y =
      clientBoundingRect.top +
      clientBoundingRect.height / 2 -
      boxBoundingRect.height / 2;
    return [`${x}px`, `${y}px`];
  }
}
