function DrawPeaks(domID, ratio) {
    var svg = document.querySelector(domID);
    var svgNS = 'http://www.w3.org/2000/svg';
    var rect;

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'x', ratio * 100 + '%');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);

    rect = document.createElementNS(svgNS, 'rect');
    rect.setAttributeNS(null, 'class', 'progress');
    // rect.setAttributeNS(null, 'class', 'preProgress');
    rect.setAttributeNS(null, 'y', 0);
    rect.setAttributeNS(null, 'width', 1);
    rect.setAttributeNS(null, 'height', '100%');
    svg.appendChild(rect);
}

export default DrawPeaks;