export const getRelativeOffset = (element: HTMLElement) => {
    const offset = {
        left: element?.offsetLeft || 0,
        top: element?.offsetTop || 0,
        width: element?.clientWidth || 0,
        height: element?.clientHeight || 0
    };

    let reference = element?.offsetParent as any;

    while (reference) {
        offset.left += reference?.offsetLeft || 0;
        offset.top += reference?.offsetTop || 0;
        reference = reference?.offsetParent;
    }

    return offset;
};
