import {useEffect, useRef} from 'react';
import ResizeObserver from 'resize-observer-polyfill';


export default function useTextFit() {
    const ref = useRef<HTMLDivElement>(null);

    const resizeObserver = new ResizeObserver(() => {
        reCalculate();
    });

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        element.style.display = 'inline-block'; // so widths calculation fit text and not container
        reCalculate();

        resizeObserver.observe(element);
        return () => resizeObserver.unobserve(element);
    }, [ref]);

    function reCalculate() {
        if (!ref.current) return;

        ref.current.style.fontSize = '';

        const text = ref.current.innerText;
        const measureDiv = document.createElement('div');

        ref.current.appendChild(measureDiv);
        measureDiv.style.whiteSpace = 'pre';
        measureDiv.style.position = 'fixed';
        measureDiv.style.display = 'inline-block';
        measureDiv.style.top = '-9999px';
        measureDiv.style.opacity = '0';
        measureDiv.style.pointerEvents = 'none';
        measureDiv.innerText = text;

        const diff = getInlineSize(ref.current) / (getInlineSize(measureDiv) + 1);

        ref.current.style.fontSize = Math.min(diff, 1) * 100 + '%';

        measureDiv.remove();
    }

    return {ref};
}

function getInlineSize(el: HTMLElement) {
    return isWritingModeSideways(el) ? el.offsetHeight : el.offsetWidth;
    // return parseInt(getComputedStyle(el).inlineSize, 10);
}

function isWritingModeSideways(el: HTMLElement) {
    return ['vertical-rl', 'vertical-lr', 'tb', 'tb-rl', 'sideways-rl', 'sideways-lr']
        .includes(getComputedStyle(el).writingMode);
}
