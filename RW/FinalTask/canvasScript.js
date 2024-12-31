
function canvasAnimation() {
    var t = document.querySelector("canvas")
      , o = t.getContext("2d");
    t.width = window.innerWidth,
    t.height = window.innerHeight,
    o.lineWidth = .3,
    o.strokeStyle = new y(950).style;
    var n = {
        x: t.width / 3,
        y: t.height / 3
    }
      , a = !2;
    "undefined" != typeof homeCanvas && !0 === homeCanvas && (a = homeCanvas);
    var r = 430;
    t.width < 450 && (r = 230);
    var d = {
        nb: r,
        distance: 100,
        d_radius: 100,
        array: []
    };
    function e(i) {
        return Math.floor(285 * Math.random() + i)
    }
    function h(i, t, o) {
        return !0 === a ? "rgba(255,255,255, 0.8)" : "rgba(0, 24, 158, 0.8)"
    }
    function s(i, t, o, n) {
        return (i * t + o * n) / (t + n)
    }
    function y(i) {
        i = i || 0,
        this.r = e(i),
        this.g = e(i),
        this.b = e(i),
        this.style = h(this.r, this.g, this.b)
    }
    function u() {
        this.x = Math.random() * t.width,
        this.y = Math.random() * t.height,
        this.vx = -.3 + Math.random(),
        this.vy = -.3 + Math.random(),
        this.radius = 2.3 * Math.random(),
        this.color = new y
    }
    u.prototype = {
        draw: function() {
            o.beginPath(),
            o.fillStyle = this.color.style,
            o.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1),
            o.fill()
        }
    },
    $("body").on("mousemove", function(i) {
        n.x = i.pageX,
        n.y = i.pageY
    }),
    function() {
        for (i = 0; i < d.nb; i++)
            d.array.push(new u)
    }(),
    requestAnimationFrame(function a() {
        o.clearRect(0, 0, t.width, t.height),
        function() {
            for (i = 0; i < d.nb; i++) {
                var o = d.array[i];
                o.y < 0 || o.y > t.height ? (o.vx = o.vx,
                o.vy = -o.vy) : (o.x < 0 || o.x > t.width) && (o.vx = -o.vx,
                o.vy = o.vy),
                o.x += o.vx,
                o.y += o.vy
            }
        }(),
        function() {
            for (i = 0; i < d.nb; i++)
                for (j = 0; j < d.nb; j++)
                    i_dot = d.array[i],
                    j_dot = d.array[j],
                    i_dot.x - j_dot.x < d.distance && i_dot.y - j_dot.y < d.distance && i_dot.x - j_dot.x > -d.distance && i_dot.y - j_dot.y > -d.distance && i_dot.x - n.x < d.d_radius && i_dot.y - n.y < d.d_radius && i_dot.x - n.x > -d.d_radius && i_dot.y - n.y > -d.d_radius && (o.beginPath(),
                    o.strokeStyle = (t = i_dot,
                    a = j_dot,
                    r = void 0,
                    e = void 0,
                    y = void 0,
                    u = void 0,
                    c = void 0,
                    r = t.color,
                    e = a.color,
                    y = s(r.r, t.radius, e.r, a.radius),
                    u = s(r.g, t.radius, e.g, a.radius),
                    c = s(r.b, t.radius, e.b, a.radius),
                    h(Math.floor(y), Math.floor(u), Math.floor(c))),
                    o.moveTo(i_dot.x, i_dot.y),
                    o.lineTo(j_dot.x, j_dot.y),
                    o.stroke(),
                    o.closePath());
            var t, a, r, e, y, u, c
        }(),
        function() {
            for (i = 0; i < d.nb; i++)
                d.array[i].draw()
        }(),
        requestAnimationFrame(a)
    })
}
$(document).ready(function() {
    canvasAnimation()
}),
$(window).resize(function() {
    canvasAnimation()
});

