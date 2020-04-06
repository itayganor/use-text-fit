"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
function useTextFit() {
    var ref = react_1.useRef(null);
    var resizeObserver = new resize_observer_polyfill_1.default(function () {
        reCalculate();
    });
    react_1.useEffect(function () {
        if (!ref.current) {
            return;
        }
        ref.current.style.display = 'inline-block'; // so widths calculation fit text and not container
        reCalculate();
        resizeObserver.observe(ref.current);
        return function () { return resizeObserver.unobserve(ref.current); };
    }, [ref]);
    function reCalculate() {
        ref.current.style.fontSize = '';
        var text = ref.current.innerText;
        var measureDiv = document.createElement('div');
        ref.current.appendChild(measureDiv);
        measureDiv.style.whiteSpace = 'pre';
        measureDiv.style.position = 'fixed';
        measureDiv.style.display = 'inline-block';
        measureDiv.style.top = '-9999px';
        measureDiv.style.opacity = '0';
        measureDiv.style.pointerEvents = 'none';
        measureDiv.innerText = text;
        var diff = getInlineSize(ref.current) / (getInlineSize(measureDiv) + 1);
        ref.current.style.fontSize = Math.min(diff, 1) * 100 + '%';
        measureDiv.remove();
    }
    return { ref: ref };
}
exports.default = useTextFit;
function getInlineSize(el) {
    return isWritingModeSideways(el) ? el.offsetHeight : el.offsetWidth;
    // return parseInt(getComputedStyle(el).inlineSize, 10);
}
function isWritingModeSideways(el) {
    return ['vertical-rl', 'vertical-lr', 'tb', 'tb-rl', 'sideways-rl', 'sideways-lr']
        .includes(getComputedStyle(el).writingMode);
}
//# sourceMappingURL=index.js.map