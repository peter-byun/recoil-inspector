import "recoil";
import "react-dom";
function kc(g, I) {
  for (var e = 0; e < I.length; e++) {
    const c = I[e];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const t in c)
        if (t !== "default" && !(t in g)) {
          const l = Object.getOwnPropertyDescriptor(c, t);
          l && Object.defineProperty(g, t, l.get ? l : {
            enumerable: !0,
            get: () => c[t]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(g, Symbol.toStringTag, { value: "Module" }));
}
function Tc(g) {
  return g && g.__esModule && Object.prototype.hasOwnProperty.call(g, "default") ? g.default : g;
}
var u = { exports: {} }, S = {};
var LC;
function Oc() {
  if (LC)
    return S;
  LC = 1;
  var g = Symbol.for("react.element"), I = Symbol.for("react.portal"), e = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), t = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), n = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), G = Symbol.for("react.suspense"), X = Symbol.for("react.memo"), Z = Symbol.for("react.lazy"), V = Symbol.iterator;
  function B(b) {
    return b === null || typeof b != "object" ? null : (b = V && b[V] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var y = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, d = Object.assign, p = {};
  function h(b, m, F) {
    this.props = b, this.context = m, this.refs = p, this.updater = F || y;
  }
  h.prototype.isReactComponent = {}, h.prototype.setState = function(b, m) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, b, m, "setState");
  }, h.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function x() {
  }
  x.prototype = h.prototype;
  function W(b, m, F) {
    this.props = b, this.context = m, this.refs = p, this.updater = F || y;
  }
  var f = W.prototype = new x();
  f.constructor = W, d(f, h.prototype), f.isPureReactComponent = !0;
  var z = Array.isArray, o = Object.prototype.hasOwnProperty, L = { current: null }, H = { key: !0, ref: !0, __self: !0, __source: !0 };
  function og(b, m, F) {
    var k, j = {}, P = null, $ = null;
    if (m != null)
      for (k in m.ref !== void 0 && ($ = m.ref), m.key !== void 0 && (P = "" + m.key), m)
        o.call(m, k) && !H.hasOwnProperty(k) && (j[k] = m[k]);
    var M = arguments.length - 2;
    if (M === 1)
      j.children = F;
    else if (1 < M) {
      for (var Q = Array(M), cg = 0; cg < M; cg++)
        Q[cg] = arguments[cg + 2];
      j.children = Q;
    }
    if (b && b.defaultProps)
      for (k in M = b.defaultProps, M)
        j[k] === void 0 && (j[k] = M[k]);
    return { $$typeof: g, type: b, key: P, ref: $, props: j, _owner: L.current };
  }
  function Gg(b, m) {
    return { $$typeof: g, type: b.type, key: m, ref: b.ref, props: b.props, _owner: b._owner };
  }
  function ug(b) {
    return typeof b == "object" && b !== null && b.$$typeof === g;
  }
  function Lg(b) {
    var m = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(F) {
      return m[F];
    });
  }
  var Rg = /\/+/g;
  function hg(b, m) {
    return typeof b == "object" && b !== null && b.key != null ? Lg("" + b.key) : m.toString(36);
  }
  function vg(b, m, F, k, j) {
    var P = typeof b;
    (P === "undefined" || P === "boolean") && (b = null);
    var $ = !1;
    if (b === null)
      $ = !0;
    else
      switch (P) {
        case "string":
        case "number":
          $ = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case g:
            case I:
              $ = !0;
          }
      }
    if ($)
      return $ = b, j = j($), b = k === "" ? "." + hg($, 0) : k, z(j) ? (F = "", b != null && (F = b.replace(Rg, "$&/") + "/"), vg(j, m, F, "", function(cg) {
        return cg;
      })) : j != null && (ug(j) && (j = Gg(j, F + (!j.key || $ && $.key === j.key ? "" : ("" + j.key).replace(Rg, "$&/") + "/") + b)), m.push(j)), 1;
    if ($ = 0, k = k === "" ? "." : k + ":", z(b))
      for (var M = 0; M < b.length; M++) {
        P = b[M];
        var Q = k + hg(P, M);
        $ += vg(P, m, F, Q, j);
      }
    else if (Q = B(b), typeof Q == "function")
      for (b = Q.call(b), M = 0; !(P = b.next()).done; )
        P = P.value, Q = k + hg(P, M++), $ += vg(P, m, F, Q, j);
    else if (P === "object")
      throw m = String(b), Error("Objects are not valid as a React child (found: " + (m === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : m) + "). If you meant to render a collection of children, use an array instead.");
    return $;
  }
  function ag(b, m, F) {
    if (b == null)
      return b;
    var k = [], j = 0;
    return vg(b, k, "", "", function(P) {
      return m.call(F, P, j++);
    }), k;
  }
  function Xg(b) {
    if (b._status === -1) {
      var m = b._result;
      m = m(), m.then(function(F) {
        (b._status === 0 || b._status === -1) && (b._status = 1, b._result = F);
      }, function(F) {
        (b._status === 0 || b._status === -1) && (b._status = 2, b._result = F);
      }), b._status === -1 && (b._status = 0, b._result = m);
    }
    if (b._status === 1)
      return b._result.default;
    throw b._result;
  }
  var N = { current: null }, mg = { transition: null }, Bg = { ReactCurrentDispatcher: N, ReactCurrentBatchConfig: mg, ReactCurrentOwner: L };
  return S.Children = { map: ag, forEach: function(b, m, F) {
    ag(b, function() {
      m.apply(this, arguments);
    }, F);
  }, count: function(b) {
    var m = 0;
    return ag(b, function() {
      m++;
    }), m;
  }, toArray: function(b) {
    return ag(b, function(m) {
      return m;
    }) || [];
  }, only: function(b) {
    if (!ug(b))
      throw Error("React.Children.only expected to receive a single React element child.");
    return b;
  } }, S.Component = h, S.Fragment = e, S.Profiler = t, S.PureComponent = W, S.StrictMode = c, S.Suspense = G, S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bg, S.cloneElement = function(b, m, F) {
    if (b == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + b + ".");
    var k = d({}, b.props), j = b.key, P = b.ref, $ = b._owner;
    if (m != null) {
      if (m.ref !== void 0 && (P = m.ref, $ = L.current), m.key !== void 0 && (j = "" + m.key), b.type && b.type.defaultProps)
        var M = b.type.defaultProps;
      for (Q in m)
        o.call(m, Q) && !H.hasOwnProperty(Q) && (k[Q] = m[Q] === void 0 && M !== void 0 ? M[Q] : m[Q]);
    }
    var Q = arguments.length - 2;
    if (Q === 1)
      k.children = F;
    else if (1 < Q) {
      M = Array(Q);
      for (var cg = 0; cg < Q; cg++)
        M[cg] = arguments[cg + 2];
      k.children = M;
    }
    return { $$typeof: g, type: b.type, key: j, ref: P, props: k, _owner: $ };
  }, S.createContext = function(b) {
    return b = { $$typeof: n, _currentValue: b, _currentValue2: b, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, b.Provider = { $$typeof: l, _context: b }, b.Consumer = b;
  }, S.createElement = og, S.createFactory = function(b) {
    var m = og.bind(null, b);
    return m.type = b, m;
  }, S.createRef = function() {
    return { current: null };
  }, S.forwardRef = function(b) {
    return { $$typeof: a, render: b };
  }, S.isValidElement = ug, S.lazy = function(b) {
    return { $$typeof: Z, _payload: { _status: -1, _result: b }, _init: Xg };
  }, S.memo = function(b, m) {
    return { $$typeof: X, type: b, compare: m === void 0 ? null : m };
  }, S.startTransition = function(b) {
    var m = mg.transition;
    mg.transition = {};
    try {
      b();
    } finally {
      mg.transition = m;
    }
  }, S.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, S.useCallback = function(b, m) {
    return N.current.useCallback(b, m);
  }, S.useContext = function(b) {
    return N.current.useContext(b);
  }, S.useDebugValue = function() {
  }, S.useDeferredValue = function(b) {
    return N.current.useDeferredValue(b);
  }, S.useEffect = function(b, m) {
    return N.current.useEffect(b, m);
  }, S.useId = function() {
    return N.current.useId();
  }, S.useImperativeHandle = function(b, m, F) {
    return N.current.useImperativeHandle(b, m, F);
  }, S.useInsertionEffect = function(b, m) {
    return N.current.useInsertionEffect(b, m);
  }, S.useLayoutEffect = function(b, m) {
    return N.current.useLayoutEffect(b, m);
  }, S.useMemo = function(b, m) {
    return N.current.useMemo(b, m);
  }, S.useReducer = function(b, m, F) {
    return N.current.useReducer(b, m, F);
  }, S.useRef = function(b) {
    return N.current.useRef(b);
  }, S.useState = function(b) {
    return N.current.useState(b);
  }, S.useSyncExternalStore = function(b, m, F) {
    return N.current.useSyncExternalStore(b, m, F);
  }, S.useTransition = function() {
    return N.current.useTransition();
  }, S.version = "18.2.0", S;
}
var bI = { exports: {} };
var kC;
function Uc() {
  return kC || (kC = 1, function(g, I) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var e = "18.2.0", c = Symbol.for("react.element"), t = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), G = Symbol.for("react.provider"), X = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = Symbol.iterator, x = "@@iterator";
      function W(C) {
        if (C === null || typeof C != "object")
          return null;
        var A = h && C[h] || C[x];
        return typeof A == "function" ? A : null;
      }
      var f = {
        current: null
      }, z = {
        transition: null
      }, o = {
        current: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, L = {
        current: null
      }, H = {}, og = null;
      function Gg(C) {
        og = C;
      }
      H.setExtraStackFrame = function(C) {
        og = C;
      }, H.getCurrentStack = null, H.getStackAddendum = function() {
        var C = "";
        og && (C += og);
        var A = H.getCurrentStack;
        return A && (C += A() || ""), C;
      };
      var ug = !1, Lg = !1, Rg = !1, hg = !1, vg = !1, ag = {
        ReactCurrentDispatcher: f,
        ReactCurrentBatchConfig: z,
        ReactCurrentOwner: L
      };
      ag.ReactDebugCurrentFrame = H, ag.ReactCurrentActQueue = o;
      function Xg(C) {
        {
          for (var A = arguments.length, i = new Array(A > 1 ? A - 1 : 0), r = 1; r < A; r++)
            i[r - 1] = arguments[r];
          mg("warn", C, i);
        }
      }
      function N(C) {
        {
          for (var A = arguments.length, i = new Array(A > 1 ? A - 1 : 0), r = 1; r < A; r++)
            i[r - 1] = arguments[r];
          mg("error", C, i);
        }
      }
      function mg(C, A, i) {
        {
          var r = ag.ReactDebugCurrentFrame, s = r.getStackAddendum();
          s !== "" && (A += "%s", i = i.concat([s]));
          var Y = i.map(function(v) {
            return String(v);
          });
          Y.unshift("Warning: " + A), Function.prototype.apply.call(console[C], console, Y);
        }
      }
      var Bg = {};
      function b(C, A) {
        {
          var i = C.constructor, r = i && (i.displayName || i.name) || "ReactClass", s = r + "." + A;
          if (Bg[s])
            return;
          N("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", A, r), Bg[s] = !0;
        }
      }
      var m = {
        isMounted: function(C) {
          return !1;
        },
        enqueueForceUpdate: function(C, A, i) {
          b(C, "forceUpdate");
        },
        enqueueReplaceState: function(C, A, i, r) {
          b(C, "replaceState");
        },
        enqueueSetState: function(C, A, i, r) {
          b(C, "setState");
        }
      }, F = Object.assign, k = {};
      Object.freeze(k);
      function j(C, A, i) {
        this.props = C, this.context = A, this.refs = k, this.updater = i || m;
      }
      j.prototype.isReactComponent = {}, j.prototype.setState = function(C, A) {
        if (typeof C != "object" && typeof C != "function" && C != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, C, A, "setState");
      }, j.prototype.forceUpdate = function(C) {
        this.updater.enqueueForceUpdate(this, C, "forceUpdate");
      };
      {
        var P = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, $ = function(C, A) {
          Object.defineProperty(j.prototype, C, {
            get: function() {
              Xg("%s(...) is deprecated in plain JavaScript React classes. %s", A[0], A[1]);
            }
          });
        };
        for (var M in P)
          P.hasOwnProperty(M) && $(M, P[M]);
      }
      function Q() {
      }
      Q.prototype = j.prototype;
      function cg(C, A, i) {
        this.props = C, this.context = A, this.refs = k, this.updater = i || m;
      }
      var kg = cg.prototype = new Q();
      kg.constructor = cg, F(kg, j.prototype), kg.isPureReactComponent = !0;
      function xI() {
        var C = {
          current: null
        };
        return Object.seal(C), C;
      }
      var R = Array.isArray;
      function yg(C) {
        return R(C);
      }
      function Ng(C) {
        {
          var A = typeof Symbol == "function" && Symbol.toStringTag, i = A && C[Symbol.toStringTag] || C.constructor.name || "Object";
          return i;
        }
      }
      function $g(C) {
        try {
          return cC(C), !1;
        } catch {
          return !0;
        }
      }
      function cC(C) {
        return "" + C;
      }
      function qg(C) {
        if ($g(C))
          return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ng(C)), cC(C);
      }
      function je(C, A, i) {
        var r = C.displayName;
        if (r)
          return r;
        var s = A.displayName || A.name || "";
        return s !== "" ? i + "(" + s + ")" : i;
      }
      function AC(C) {
        return C.displayName || "Context";
      }
      function xg(C) {
        if (C == null)
          return null;
        if (typeof C.tag == "number" && N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof C == "function")
          return C.displayName || C.name || null;
        if (typeof C == "string")
          return C;
        switch (C) {
          case l:
            return "Fragment";
          case t:
            return "Portal";
          case a:
            return "Profiler";
          case n:
            return "StrictMode";
          case V:
            return "Suspense";
          case B:
            return "SuspenseList";
        }
        if (typeof C == "object")
          switch (C.$$typeof) {
            case X:
              var A = C;
              return AC(A) + ".Consumer";
            case G:
              var i = C;
              return AC(i._context) + ".Provider";
            case Z:
              return je(C, C.render, "ForwardRef");
            case y:
              var r = C.displayName || null;
              return r !== null ? r : xg(C.type) || "Memo";
            case d: {
              var s = C, Y = s._payload, v = s._init;
              try {
                return xg(v(Y));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Tg = Object.prototype.hasOwnProperty, tC = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, lC, nC, hI;
      hI = {};
      function bC(C) {
        if (Tg.call(C, "ref")) {
          var A = Object.getOwnPropertyDescriptor(C, "ref").get;
          if (A && A.isReactWarning)
            return !1;
        }
        return C.ref !== void 0;
      }
      function iC(C) {
        if (Tg.call(C, "key")) {
          var A = Object.getOwnPropertyDescriptor(C, "key").get;
          if (A && A.isReactWarning)
            return !1;
        }
        return C.key !== void 0;
      }
      function we(C, A) {
        var i = function() {
          lC || (lC = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", A));
        };
        i.isReactWarning = !0, Object.defineProperty(C, "key", {
          get: i,
          configurable: !0
        });
      }
      function Le(C, A) {
        var i = function() {
          nC || (nC = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", A));
        };
        i.isReactWarning = !0, Object.defineProperty(C, "ref", {
          get: i,
          configurable: !0
        });
      }
      function ke(C) {
        if (typeof C.ref == "string" && L.current && C.__self && L.current.stateNode !== C.__self) {
          var A = xg(L.current.type);
          hI[A] || (N('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', A, C.ref), hI[A] = !0);
        }
      }
      var RI = function(C, A, i, r, s, Y, v) {
        var J = {
          $$typeof: c,
          type: C,
          key: A,
          ref: i,
          props: v,
          _owner: Y
        };
        return J._store = {}, Object.defineProperty(J._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(J, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: r
        }), Object.defineProperty(J, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: s
        }), Object.freeze && (Object.freeze(J.props), Object.freeze(J)), J;
      };
      function Te(C, A, i) {
        var r, s = {}, Y = null, v = null, J = null, w = null;
        if (A != null) {
          bC(A) && (v = A.ref, ke(A)), iC(A) && (qg(A.key), Y = "" + A.key), J = A.__self === void 0 ? null : A.__self, w = A.__source === void 0 ? null : A.__source;
          for (r in A)
            Tg.call(A, r) && !tC.hasOwnProperty(r) && (s[r] = A[r]);
        }
        var E = arguments.length - 2;
        if (E === 1)
          s.children = i;
        else if (E > 1) {
          for (var _ = Array(E), K = 0; K < E; K++)
            _[K] = arguments[K + 2];
          Object.freeze && Object.freeze(_), s.children = _;
        }
        if (C && C.defaultProps) {
          var q = C.defaultProps;
          for (r in q)
            s[r] === void 0 && (s[r] = q[r]);
        }
        if (Y || v) {
          var Ig = typeof C == "function" ? C.displayName || C.name || "Unknown" : C;
          Y && we(s, Ig), v && Le(s, Ig);
        }
        return RI(C, Y, v, J, w, L.current, s);
      }
      function Oe(C, A) {
        var i = RI(C.type, A, C.ref, C._self, C._source, C._owner, C.props);
        return i;
      }
      function Ue(C, A, i) {
        if (C == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + C + ".");
        var r, s = F({}, C.props), Y = C.key, v = C.ref, J = C._self, w = C._source, E = C._owner;
        if (A != null) {
          bC(A) && (v = A.ref, E = L.current), iC(A) && (qg(A.key), Y = "" + A.key);
          var _;
          C.type && C.type.defaultProps && (_ = C.type.defaultProps);
          for (r in A)
            Tg.call(A, r) && !tC.hasOwnProperty(r) && (A[r] === void 0 && _ !== void 0 ? s[r] = _[r] : s[r] = A[r]);
        }
        var K = arguments.length - 2;
        if (K === 1)
          s.children = i;
        else if (K > 1) {
          for (var q = Array(K), Ig = 0; Ig < K; Ig++)
            q[Ig] = arguments[Ig + 2];
          s.children = q;
        }
        return RI(C.type, Y, v, J, w, E, s);
      }
      function Yg(C) {
        return typeof C == "object" && C !== null && C.$$typeof === c;
      }
      var aC = ".", De = ":";
      function Ee(C) {
        var A = /[=:]/g, i = {
          "=": "=0",
          ":": "=2"
        }, r = C.replace(A, function(s) {
          return i[s];
        });
        return "$" + r;
      }
      var rC = !1, Pe = /\/+/g;
      function uC(C) {
        return C.replace(Pe, "$&/");
      }
      function BI(C, A) {
        return typeof C == "object" && C !== null && C.key != null ? (qg(C.key), Ee("" + C.key)) : A.toString(36);
      }
      function gI(C, A, i, r, s) {
        var Y = typeof C;
        (Y === "undefined" || Y === "boolean") && (C = null);
        var v = !1;
        if (C === null)
          v = !0;
        else
          switch (Y) {
            case "string":
            case "number":
              v = !0;
              break;
            case "object":
              switch (C.$$typeof) {
                case c:
                case t:
                  v = !0;
              }
          }
        if (v) {
          var J = C, w = s(J), E = r === "" ? aC + BI(J, 0) : r;
          if (yg(w)) {
            var _ = "";
            E != null && (_ = uC(E) + "/"), gI(w, A, _, "", function(Lc) {
              return Lc;
            });
          } else
            w != null && (Yg(w) && (w.key && (!J || J.key !== w.key) && qg(w.key), w = Oe(
              w,
              i + (w.key && (!J || J.key !== w.key) ? uC("" + w.key) + "/" : "") + E
            )), A.push(w));
          return 1;
        }
        var K, q, Ig = 0, Ag = r === "" ? aC : r + De;
        if (yg(C))
          for (var nI = 0; nI < C.length; nI++)
            K = C[nI], q = Ag + BI(K, nI), Ig += gI(K, A, i, q, s);
        else {
          var jI = W(C);
          if (typeof jI == "function") {
            var SC = C;
            jI === SC.entries && (rC || Xg("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rC = !0);
            for (var jc = jI.call(SC), jC, wc = 0; !(jC = jc.next()).done; )
              K = jC.value, q = Ag + BI(K, wc++), Ig += gI(K, A, i, q, s);
          } else if (Y === "object") {
            var wC = String(C);
            throw new Error("Objects are not valid as a React child (found: " + (wC === "[object Object]" ? "object with keys {" + Object.keys(C).join(", ") + "}" : wC) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Ig;
      }
      function II(C, A, i) {
        if (C == null)
          return C;
        var r = [], s = 0;
        return gI(C, r, "", "", function(Y) {
          return A.call(i, Y, s++);
        }), r;
      }
      function Me(C) {
        var A = 0;
        return II(C, function() {
          A++;
        }), A;
      }
      function Qe(C, A, i) {
        II(C, function() {
          A.apply(this, arguments);
        }, i);
      }
      function _e(C) {
        return II(C, function(A) {
          return A;
        }) || [];
      }
      function Ke(C) {
        if (!Yg(C))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return C;
      }
      function $e(C) {
        var A = {
          $$typeof: X,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null
        };
        A.Provider = {
          $$typeof: G,
          _context: A
        };
        var i = !1, r = !1, s = !1;
        {
          var Y = {
            $$typeof: X,
            _context: A
          };
          Object.defineProperties(Y, {
            Provider: {
              get: function() {
                return r || (r = !0, N("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), A.Provider;
              },
              set: function(v) {
                A.Provider = v;
              }
            },
            _currentValue: {
              get: function() {
                return A._currentValue;
              },
              set: function(v) {
                A._currentValue = v;
              }
            },
            _currentValue2: {
              get: function() {
                return A._currentValue2;
              },
              set: function(v) {
                A._currentValue2 = v;
              }
            },
            _threadCount: {
              get: function() {
                return A._threadCount;
              },
              set: function(v) {
                A._threadCount = v;
              }
            },
            Consumer: {
              get: function() {
                return i || (i = !0, N("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), A.Consumer;
              }
            },
            displayName: {
              get: function() {
                return A.displayName;
              },
              set: function(v) {
                s || (Xg("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", v), s = !0);
              }
            }
          }), A.Consumer = Y;
        }
        return A._currentRenderer = null, A._currentRenderer2 = null, A;
      }
      var Og = -1, NI = 0, oC = 1, qe = 2;
      function gc(C) {
        if (C._status === Og) {
          var A = C._result, i = A();
          if (i.then(function(Y) {
            if (C._status === NI || C._status === Og) {
              var v = C;
              v._status = oC, v._result = Y;
            }
          }, function(Y) {
            if (C._status === NI || C._status === Og) {
              var v = C;
              v._status = qe, v._result = Y;
            }
          }), C._status === Og) {
            var r = C;
            r._status = NI, r._result = i;
          }
        }
        if (C._status === oC) {
          var s = C._result;
          return s === void 0 && N(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, s), "default" in s || N(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, s), s.default;
        } else
          throw C._result;
      }
      function Ic(C) {
        var A = {
          _status: Og,
          _result: C
        }, i = {
          $$typeof: d,
          _payload: A,
          _init: gc
        };
        {
          var r, s;
          Object.defineProperties(i, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return r;
              },
              set: function(Y) {
                N("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), r = Y, Object.defineProperty(i, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return s;
              },
              set: function(Y) {
                N("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), s = Y, Object.defineProperty(i, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return i;
      }
      function Cc(C) {
        C != null && C.$$typeof === y ? N("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof C != "function" ? N("forwardRef requires a render function but was given %s.", C === null ? "null" : typeof C) : C.length !== 0 && C.length !== 2 && N("forwardRef render functions accept exactly two parameters: props and ref. %s", C.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), C != null && (C.defaultProps != null || C.propTypes != null) && N("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var A = {
          $$typeof: Z,
          render: C
        };
        {
          var i;
          Object.defineProperty(A, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return i;
            },
            set: function(r) {
              i = r, !C.name && !C.displayName && (C.displayName = r);
            }
          });
        }
        return A;
      }
      var GC;
      GC = Symbol.for("react.module.reference");
      function dC(C) {
        return !!(typeof C == "string" || typeof C == "function" || C === l || C === a || vg || C === n || C === V || C === B || hg || C === p || ug || Lg || Rg || typeof C == "object" && C !== null && (C.$$typeof === d || C.$$typeof === y || C.$$typeof === G || C.$$typeof === X || C.$$typeof === Z || C.$$typeof === GC || C.getModuleId !== void 0));
      }
      function ec(C, A) {
        dC(C) || N("memo: The first argument must be a component. Instead received: %s", C === null ? "null" : typeof C);
        var i = {
          $$typeof: y,
          type: C,
          compare: A === void 0 ? null : A
        };
        {
          var r;
          Object.defineProperty(i, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return r;
            },
            set: function(s) {
              r = s, !C.name && !C.displayName && (C.displayName = s);
            }
          });
        }
        return i;
      }
      function ng() {
        var C = f.current;
        return C === null && N(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), C;
      }
      function cc(C) {
        var A = ng();
        if (C._context !== void 0) {
          var i = C._context;
          i.Consumer === C ? N("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : i.Provider === C && N("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return A.useContext(C);
      }
      function Ac(C) {
        var A = ng();
        return A.useState(C);
      }
      function tc(C, A, i) {
        var r = ng();
        return r.useReducer(C, A, i);
      }
      function lc(C) {
        var A = ng();
        return A.useRef(C);
      }
      function nc(C, A) {
        var i = ng();
        return i.useEffect(C, A);
      }
      function bc(C, A) {
        var i = ng();
        return i.useInsertionEffect(C, A);
      }
      function ic(C, A) {
        var i = ng();
        return i.useLayoutEffect(C, A);
      }
      function ac(C, A) {
        var i = ng();
        return i.useCallback(C, A);
      }
      function rc(C, A) {
        var i = ng();
        return i.useMemo(C, A);
      }
      function uc(C, A, i) {
        var r = ng();
        return r.useImperativeHandle(C, A, i);
      }
      function oc(C, A) {
        {
          var i = ng();
          return i.useDebugValue(C, A);
        }
      }
      function Gc() {
        var C = ng();
        return C.useTransition();
      }
      function dc(C) {
        var A = ng();
        return A.useDeferredValue(C);
      }
      function sc() {
        var C = ng();
        return C.useId();
      }
      function Zc(C, A, i) {
        var r = ng();
        return r.useSyncExternalStore(C, A, i);
      }
      var Ug = 0, sC, ZC, XC, mC, VC, pC, WC;
      function vC() {
      }
      vC.__reactDisabledLog = !0;
      function Xc() {
        {
          if (Ug === 0) {
            sC = console.log, ZC = console.info, XC = console.warn, mC = console.error, VC = console.group, pC = console.groupCollapsed, WC = console.groupEnd;
            var C = {
              configurable: !0,
              enumerable: !0,
              value: vC,
              writable: !0
            };
            Object.defineProperties(console, {
              info: C,
              log: C,
              warn: C,
              error: C,
              group: C,
              groupCollapsed: C,
              groupEnd: C
            });
          }
          Ug++;
        }
      }
      function mc() {
        {
          if (Ug--, Ug === 0) {
            var C = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: F({}, C, {
                value: sC
              }),
              info: F({}, C, {
                value: ZC
              }),
              warn: F({}, C, {
                value: XC
              }),
              error: F({}, C, {
                value: mC
              }),
              group: F({}, C, {
                value: VC
              }),
              groupCollapsed: F({}, C, {
                value: pC
              }),
              groupEnd: F({}, C, {
                value: WC
              })
            });
          }
          Ug < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var YI = ag.ReactCurrentDispatcher, fI;
      function CI(C, A, i) {
        {
          if (fI === void 0)
            try {
              throw Error();
            } catch (s) {
              var r = s.stack.trim().match(/\n( *(at )?)/);
              fI = r && r[1] || "";
            }
          return `
` + fI + C;
        }
      }
      var JI = !1, eI;
      {
        var Vc = typeof WeakMap == "function" ? WeakMap : Map;
        eI = new Vc();
      }
      function yC(C, A) {
        if (!C || JI)
          return "";
        {
          var i = eI.get(C);
          if (i !== void 0)
            return i;
        }
        var r;
        JI = !0;
        var s = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Y;
        Y = YI.current, YI.current = null, Xc();
        try {
          if (A) {
            var v = function() {
              throw Error();
            };
            if (Object.defineProperty(v.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(v, []);
              } catch (Ag) {
                r = Ag;
              }
              Reflect.construct(C, [], v);
            } else {
              try {
                v.call();
              } catch (Ag) {
                r = Ag;
              }
              C.call(v.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Ag) {
              r = Ag;
            }
            C();
          }
        } catch (Ag) {
          if (Ag && r && typeof Ag.stack == "string") {
            for (var J = Ag.stack.split(`
`), w = r.stack.split(`
`), E = J.length - 1, _ = w.length - 1; E >= 1 && _ >= 0 && J[E] !== w[_]; )
              _--;
            for (; E >= 1 && _ >= 0; E--, _--)
              if (J[E] !== w[_]) {
                if (E !== 1 || _ !== 1)
                  do
                    if (E--, _--, _ < 0 || J[E] !== w[_]) {
                      var K = `
` + J[E].replace(" at new ", " at ");
                      return C.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", C.displayName)), typeof C == "function" && eI.set(C, K), K;
                    }
                  while (E >= 1 && _ >= 0);
                break;
              }
          }
        } finally {
          JI = !1, YI.current = Y, mc(), Error.prepareStackTrace = s;
        }
        var q = C ? C.displayName || C.name : "", Ig = q ? CI(q) : "";
        return typeof C == "function" && eI.set(C, Ig), Ig;
      }
      function pc(C, A, i) {
        return yC(C, !1);
      }
      function Wc(C) {
        var A = C.prototype;
        return !!(A && A.isReactComponent);
      }
      function cI(C, A, i) {
        if (C == null)
          return "";
        if (typeof C == "function")
          return yC(C, Wc(C));
        if (typeof C == "string")
          return CI(C);
        switch (C) {
          case V:
            return CI("Suspense");
          case B:
            return CI("SuspenseList");
        }
        if (typeof C == "object")
          switch (C.$$typeof) {
            case Z:
              return pc(C.render);
            case y:
              return cI(C.type, A, i);
            case d: {
              var r = C, s = r._payload, Y = r._init;
              try {
                return cI(Y(s), A, i);
              } catch {
              }
            }
          }
        return "";
      }
      var xC = {}, hC = ag.ReactDebugCurrentFrame;
      function AI(C) {
        if (C) {
          var A = C._owner, i = cI(C.type, C._source, A ? A.type : null);
          hC.setExtraStackFrame(i);
        } else
          hC.setExtraStackFrame(null);
      }
      function vc(C, A, i, r, s) {
        {
          var Y = Function.call.bind(Tg);
          for (var v in C)
            if (Y(C, v)) {
              var J = void 0;
              try {
                if (typeof C[v] != "function") {
                  var w = Error((r || "React class") + ": " + i + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof C[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw w.name = "Invariant Violation", w;
                }
                J = C[v](A, v, r, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (E) {
                J = E;
              }
              J && !(J instanceof Error) && (AI(s), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", r || "React class", i, v, typeof J), AI(null)), J instanceof Error && !(J.message in xC) && (xC[J.message] = !0, AI(s), N("Failed %s type: %s", i, J.message), AI(null));
            }
        }
      }
      function fg(C) {
        if (C) {
          var A = C._owner, i = cI(C.type, C._source, A ? A.type : null);
          Gg(i);
        } else
          Gg(null);
      }
      var FI;
      FI = !1;
      function RC() {
        if (L.current) {
          var C = xg(L.current.type);
          if (C)
            return `

Check the render method of \`` + C + "`.";
        }
        return "";
      }
      function yc(C) {
        if (C !== void 0) {
          var A = C.fileName.replace(/^.*[\\\/]/, ""), i = C.lineNumber;
          return `

Check your code at ` + A + ":" + i + ".";
        }
        return "";
      }
      function xc(C) {
        return C != null ? yc(C.__source) : "";
      }
      var BC = {};
      function hc(C) {
        var A = RC();
        if (!A) {
          var i = typeof C == "string" ? C : C.displayName || C.name;
          i && (A = `

Check the top-level render call using <` + i + ">.");
        }
        return A;
      }
      function NC(C, A) {
        if (!(!C._store || C._store.validated || C.key != null)) {
          C._store.validated = !0;
          var i = hc(A);
          if (!BC[i]) {
            BC[i] = !0;
            var r = "";
            C && C._owner && C._owner !== L.current && (r = " It was passed a child from " + xg(C._owner.type) + "."), fg(C), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, r), fg(null);
          }
        }
      }
      function YC(C, A) {
        if (typeof C == "object") {
          if (yg(C))
            for (var i = 0; i < C.length; i++) {
              var r = C[i];
              Yg(r) && NC(r, A);
            }
          else if (Yg(C))
            C._store && (C._store.validated = !0);
          else if (C) {
            var s = W(C);
            if (typeof s == "function" && s !== C.entries)
              for (var Y = s.call(C), v; !(v = Y.next()).done; )
                Yg(v.value) && NC(v.value, A);
          }
        }
      }
      function fC(C) {
        {
          var A = C.type;
          if (A == null || typeof A == "string")
            return;
          var i;
          if (typeof A == "function")
            i = A.propTypes;
          else if (typeof A == "object" && (A.$$typeof === Z || A.$$typeof === y))
            i = A.propTypes;
          else
            return;
          if (i) {
            var r = xg(A);
            vc(i, C.props, "prop", r, C);
          } else if (A.PropTypes !== void 0 && !FI) {
            FI = !0;
            var s = xg(A);
            N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", s || "Unknown");
          }
          typeof A.getDefaultProps == "function" && !A.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Rc(C) {
        {
          for (var A = Object.keys(C.props), i = 0; i < A.length; i++) {
            var r = A[i];
            if (r !== "children" && r !== "key") {
              fg(C), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", r), fg(null);
              break;
            }
          }
          C.ref !== null && (fg(C), N("Invalid attribute `ref` supplied to `React.Fragment`."), fg(null));
        }
      }
      function JC(C, A, i) {
        var r = dC(C);
        if (!r) {
          var s = "";
          (C === void 0 || typeof C == "object" && C !== null && Object.keys(C).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Y = xc(A);
          Y ? s += Y : s += RC();
          var v;
          C === null ? v = "null" : yg(C) ? v = "array" : C !== void 0 && C.$$typeof === c ? (v = "<" + (xg(C.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : v = typeof C, N("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, s);
        }
        var J = Te.apply(this, arguments);
        if (J == null)
          return J;
        if (r)
          for (var w = 2; w < arguments.length; w++)
            YC(arguments[w], C);
        return C === l ? Rc(J) : fC(J), J;
      }
      var FC = !1;
      function Bc(C) {
        var A = JC.bind(null, C);
        return A.type = C, FC || (FC = !0, Xg("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(A, "type", {
          enumerable: !1,
          get: function() {
            return Xg("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: C
            }), C;
          }
        }), A;
      }
      function Nc(C, A, i) {
        for (var r = Ue.apply(this, arguments), s = 2; s < arguments.length; s++)
          YC(arguments[s], r.type);
        return fC(r), r;
      }
      function Yc(C, A) {
        var i = z.transition;
        z.transition = {};
        var r = z.transition;
        z.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          C();
        } finally {
          if (z.transition = i, i === null && r._updatedFibers) {
            var s = r._updatedFibers.size;
            s > 10 && Xg("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), r._updatedFibers.clear();
          }
        }
      }
      var zC = !1, tI = null;
      function fc(C) {
        if (tI === null)
          try {
            var A = ("require" + Math.random()).slice(0, 7), i = g && g[A];
            tI = i.call(g, "timers").setImmediate;
          } catch {
            tI = function(s) {
              zC === !1 && (zC = !0, typeof MessageChannel > "u" && N("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Y = new MessageChannel();
              Y.port1.onmessage = s, Y.port2.postMessage(void 0);
            };
          }
        return tI(C);
      }
      var Jg = 0, HC = !1;
      function Jc(C) {
        {
          var A = Jg;
          Jg++, o.current === null && (o.current = []);
          var i = o.isBatchingLegacy, r;
          try {
            if (o.isBatchingLegacy = !0, r = C(), !i && o.didScheduleLegacyUpdate) {
              var s = o.current;
              s !== null && (o.didScheduleLegacyUpdate = !1, SI(s));
            }
          } catch (q) {
            throw lI(A), q;
          } finally {
            o.isBatchingLegacy = i;
          }
          if (r !== null && typeof r == "object" && typeof r.then == "function") {
            var Y = r, v = !1, J = {
              then: function(q, Ig) {
                v = !0, Y.then(function(Ag) {
                  lI(A), Jg === 0 ? zI(Ag, q, Ig) : q(Ag);
                }, function(Ag) {
                  lI(A), Ig(Ag);
                });
              }
            };
            return !HC && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              v || (HC = !0, N("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), J;
          } else {
            var w = r;
            if (lI(A), Jg === 0) {
              var E = o.current;
              E !== null && (SI(E), o.current = null);
              var _ = {
                then: function(q, Ig) {
                  o.current === null ? (o.current = [], zI(w, q, Ig)) : q(w);
                }
              };
              return _;
            } else {
              var K = {
                then: function(q, Ig) {
                  q(w);
                }
              };
              return K;
            }
          }
        }
      }
      function lI(C) {
        C !== Jg - 1 && N("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Jg = C;
      }
      function zI(C, A, i) {
        {
          var r = o.current;
          if (r !== null)
            try {
              SI(r), fc(function() {
                r.length === 0 ? (o.current = null, A(C)) : zI(C, A, i);
              });
            } catch (s) {
              i(s);
            }
          else
            A(C);
        }
      }
      var HI = !1;
      function SI(C) {
        if (!HI) {
          HI = !0;
          var A = 0;
          try {
            for (; A < C.length; A++) {
              var i = C[A];
              do
                i = i(!0);
              while (i !== null);
            }
            C.length = 0;
          } catch (r) {
            throw C = C.slice(A + 1), r;
          } finally {
            HI = !1;
          }
        }
      }
      var Fc = JC, zc = Nc, Hc = Bc, Sc = {
        map: II,
        forEach: Qe,
        count: Me,
        toArray: _e,
        only: Ke
      };
      I.Children = Sc, I.Component = j, I.Fragment = l, I.Profiler = a, I.PureComponent = cg, I.StrictMode = n, I.Suspense = V, I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ag, I.cloneElement = zc, I.createContext = $e, I.createElement = Fc, I.createFactory = Hc, I.createRef = xI, I.forwardRef = Cc, I.isValidElement = Yg, I.lazy = Ic, I.memo = ec, I.startTransition = Yc, I.unstable_act = Jc, I.useCallback = ac, I.useContext = cc, I.useDebugValue = oc, I.useDeferredValue = dc, I.useEffect = nc, I.useId = sc, I.useImperativeHandle = uc, I.useInsertionEffect = bc, I.useLayoutEffect = ic, I.useMemo = rc, I.useReducer = tc, I.useRef = lc, I.useState = Ac, I.useSyncExternalStore = Zc, I.useTransition = Gc, I.version = e, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(bI, bI.exports)), bI.exports;
}
(function(g) {
  process.env.NODE_ENV === "production" ? g.exports = Oc() : g.exports = Uc();
})(u);
const dg = /* @__PURE__ */ Tc(u.exports), LI = /* @__PURE__ */ kc({
  __proto__: null,
  default: dg
}, [u.exports]);
function Dc(g) {
  if (g.sheet)
    return g.sheet;
  for (var I = 0; I < document.styleSheets.length; I++)
    if (document.styleSheets[I].ownerNode === g)
      return document.styleSheets[I];
}
function Ec(g) {
  var I = document.createElement("style");
  return I.setAttribute("data-emotion", g.key), g.nonce !== void 0 && I.setAttribute("nonce", g.nonce), I.appendChild(document.createTextNode("")), I.setAttribute("data-s", ""), I;
}
var Pc = /* @__PURE__ */ function() {
  function g(e) {
    var c = this;
    this._insertTag = function(t) {
      var l;
      c.tags.length === 0 ? c.insertionPoint ? l = c.insertionPoint.nextSibling : c.prepend ? l = c.container.firstChild : l = c.before : l = c.tags[c.tags.length - 1].nextSibling, c.container.insertBefore(t, l), c.tags.push(t);
    }, this.isSpeedy = e.speedy === void 0 ? process.env.NODE_ENV === "production" : e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
  }
  var I = g.prototype;
  return I.hydrate = function(c) {
    c.forEach(this._insertTag);
  }, I.insert = function(c) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Ec(this));
    var t = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var l = c.charCodeAt(0) === 64 && c.charCodeAt(1) === 105;
      l && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + c + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !l;
    }
    if (this.isSpeedy) {
      var n = Dc(t);
      try {
        n.insertRule(c, n.cssRules.length);
      } catch (a) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(c) && console.error('There was a problem inserting the following rule: "' + c + '"', a);
      }
    } else
      t.appendChild(document.createTextNode(c));
    this.ctr++;
  }, I.flush = function() {
    this.tags.forEach(function(c) {
      return c.parentNode && c.parentNode.removeChild(c);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, g;
}(), lg = "-ms-", oI = "-moz-", T = "-webkit-", EI = "comm", PI = "rule", MI = "decl", Mc = "@import", ie = "@keyframes", Qc = Math.abs, sI = String.fromCharCode, _c = Object.assign;
function Kc(g, I) {
  return tg(g, 0) ^ 45 ? (((I << 2 ^ tg(g, 0)) << 2 ^ tg(g, 1)) << 2 ^ tg(g, 2)) << 2 ^ tg(g, 3) : 0;
}
function ae(g) {
  return g.trim();
}
function $c(g, I) {
  return (g = I.exec(g)) ? g[0] : g;
}
function D(g, I, e) {
  return g.replace(I, e);
}
function kI(g, I) {
  return g.indexOf(I);
}
function tg(g, I) {
  return g.charCodeAt(I) | 0;
}
function Eg(g, I, e) {
  return g.slice(I, e);
}
function Vg(g) {
  return g.length;
}
function QI(g) {
  return g.length;
}
function iI(g, I) {
  return I.push(g), g;
}
function qc(g, I) {
  return g.map(I).join("");
}
var ZI = 1, zg = 1, re = 0, ig = 0, eg = 0, Sg = "";
function XI(g, I, e, c, t, l, n) {
  return { value: g, root: I, parent: e, type: c, props: t, children: l, line: ZI, column: zg, length: n, return: "" };
}
function Dg(g, I) {
  return _c(XI("", null, null, "", null, null, 0), g, { length: -g.length }, I);
}
function gA() {
  return eg;
}
function IA() {
  return eg = ig > 0 ? tg(Sg, --ig) : 0, zg--, eg === 10 && (zg = 1, ZI--), eg;
}
function rg() {
  return eg = ig < re ? tg(Sg, ig++) : 0, zg++, eg === 10 && (zg = 1, ZI++), eg;
}
function pg() {
  return tg(Sg, ig);
}
function aI() {
  return ig;
}
function _g(g, I) {
  return Eg(Sg, g, I);
}
function Pg(g) {
  switch (g) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function ue(g) {
  return ZI = zg = 1, re = Vg(Sg = g), ig = 0, [];
}
function oe(g) {
  return Sg = "", g;
}
function rI(g) {
  return ae(_g(ig - 1, TI(g === 91 ? g + 2 : g === 40 ? g + 1 : g)));
}
function CA(g) {
  for (; (eg = pg()) && eg < 33; )
    rg();
  return Pg(g) > 2 || Pg(eg) > 3 ? "" : " ";
}
function eA(g, I) {
  for (; --I && rg() && !(eg < 48 || eg > 102 || eg > 57 && eg < 65 || eg > 70 && eg < 97); )
    ;
  return _g(g, aI() + (I < 6 && pg() == 32 && rg() == 32));
}
function TI(g) {
  for (; rg(); )
    switch (eg) {
      case g:
        return ig;
      case 34:
      case 39:
        g !== 34 && g !== 39 && TI(eg);
        break;
      case 40:
        g === 41 && TI(g);
        break;
      case 92:
        rg();
        break;
    }
  return ig;
}
function cA(g, I) {
  for (; rg() && g + eg !== 47 + 10; )
    if (g + eg === 42 + 42 && pg() === 47)
      break;
  return "/*" + _g(I, ig - 1) + "*" + sI(g === 47 ? g : rg());
}
function AA(g) {
  for (; !Pg(pg()); )
    rg();
  return _g(g, ig);
}
function tA(g) {
  return oe(uI("", null, null, null, [""], g = ue(g), 0, [0], g));
}
function uI(g, I, e, c, t, l, n, a, G) {
  for (var X = 0, Z = 0, V = n, B = 0, y = 0, d = 0, p = 1, h = 1, x = 1, W = 0, f = "", z = t, o = l, L = c, H = f; h; )
    switch (d = W, W = rg()) {
      case 40:
        if (d != 108 && tg(H, V - 1) == 58) {
          kI(H += D(rI(W), "&", "&\f"), "&\f") != -1 && (x = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        H += rI(W);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        H += CA(d);
        break;
      case 92:
        H += eA(aI() - 1, 7);
        continue;
      case 47:
        switch (pg()) {
          case 42:
          case 47:
            iI(lA(cA(rg(), aI()), I, e), G);
            break;
          default:
            H += "/";
        }
        break;
      case 123 * p:
        a[X++] = Vg(H) * x;
      case 125 * p:
      case 59:
      case 0:
        switch (W) {
          case 0:
          case 125:
            h = 0;
          case 59 + Z:
            y > 0 && Vg(H) - V && iI(y > 32 ? OC(H + ";", c, e, V - 1) : OC(D(H, " ", "") + ";", c, e, V - 2), G);
            break;
          case 59:
            H += ";";
          default:
            if (iI(L = TC(H, I, e, X, Z, t, a, f, z = [], o = [], V), l), W === 123)
              if (Z === 0)
                uI(H, I, L, L, z, l, V, a, o);
              else
                switch (B === 99 && tg(H, 3) === 110 ? 100 : B) {
                  case 100:
                  case 109:
                  case 115:
                    uI(g, L, L, c && iI(TC(g, L, L, 0, 0, t, a, f, t, z = [], V), o), t, o, V, a, c ? z : o);
                    break;
                  default:
                    uI(H, L, L, L, [""], o, 0, a, o);
                }
        }
        X = Z = y = 0, p = x = 1, f = H = "", V = n;
        break;
      case 58:
        V = 1 + Vg(H), y = d;
      default:
        if (p < 1) {
          if (W == 123)
            --p;
          else if (W == 125 && p++ == 0 && IA() == 125)
            continue;
        }
        switch (H += sI(W), W * p) {
          case 38:
            x = Z > 0 ? 1 : (H += "\f", -1);
            break;
          case 44:
            a[X++] = (Vg(H) - 1) * x, x = 1;
            break;
          case 64:
            pg() === 45 && (H += rI(rg())), B = pg(), Z = V = Vg(f = H += AA(aI())), W++;
            break;
          case 45:
            d === 45 && Vg(H) == 2 && (p = 0);
        }
    }
  return l;
}
function TC(g, I, e, c, t, l, n, a, G, X, Z) {
  for (var V = t - 1, B = t === 0 ? l : [""], y = QI(B), d = 0, p = 0, h = 0; d < c; ++d)
    for (var x = 0, W = Eg(g, V + 1, V = Qc(p = n[d])), f = g; x < y; ++x)
      (f = ae(p > 0 ? B[x] + " " + W : D(W, /&\f/g, B[x]))) && (G[h++] = f);
  return XI(g, I, e, t === 0 ? PI : a, G, X, Z);
}
function lA(g, I, e) {
  return XI(g, I, e, EI, sI(gA()), Eg(g, 2, -2), 0);
}
function OC(g, I, e, c) {
  return XI(g, I, e, MI, Eg(g, 0, c), Eg(g, c + 1, -1), c);
}
function Fg(g, I) {
  for (var e = "", c = QI(g), t = 0; t < c; t++)
    e += I(g[t], t, g, I) || "";
  return e;
}
function nA(g, I, e, c) {
  switch (g.type) {
    case Mc:
    case MI:
      return g.return = g.return || g.value;
    case EI:
      return "";
    case ie:
      return g.return = g.value + "{" + Fg(g.children, c) + "}";
    case PI:
      g.value = g.props.join(",");
  }
  return Vg(e = Fg(g.children, c)) ? g.return = g.value + "{" + e + "}" : "";
}
function bA(g) {
  var I = QI(g);
  return function(e, c, t, l) {
    for (var n = "", a = 0; a < I; a++)
      n += g[a](e, c, t, l) || "";
    return n;
  };
}
function iA(g) {
  return function(I) {
    I.root || (I = I.return) && g(I);
  };
}
function Ge(g) {
  var I = /* @__PURE__ */ Object.create(null);
  return function(e) {
    return I[e] === void 0 && (I[e] = g(e)), I[e];
  };
}
var aA = function(I, e, c) {
  for (var t = 0, l = 0; t = l, l = pg(), t === 38 && l === 12 && (e[c] = 1), !Pg(l); )
    rg();
  return _g(I, ig);
}, rA = function(I, e) {
  var c = -1, t = 44;
  do
    switch (Pg(t)) {
      case 0:
        t === 38 && pg() === 12 && (e[c] = 1), I[c] += aA(ig - 1, e, c);
        break;
      case 2:
        I[c] += rI(t);
        break;
      case 4:
        if (t === 44) {
          I[++c] = pg() === 58 ? "&\f" : "", e[c] = I[c].length;
          break;
        }
      default:
        I[c] += sI(t);
    }
  while (t = rg());
  return I;
}, uA = function(I, e) {
  return oe(rA(ue(I), e));
}, UC = /* @__PURE__ */ new WeakMap(), oA = function(I) {
  if (!(I.type !== "rule" || !I.parent || I.length < 1)) {
    for (var e = I.value, c = I.parent, t = I.column === c.column && I.line === c.line; c.type !== "rule"; )
      if (c = c.parent, !c)
        return;
    if (!(I.props.length === 1 && e.charCodeAt(0) !== 58 && !UC.get(c)) && !t) {
      UC.set(I, !0);
      for (var l = [], n = uA(e, l), a = c.props, G = 0, X = 0; G < n.length; G++)
        for (var Z = 0; Z < a.length; Z++, X++)
          I.props[X] = l[G] ? n[G].replace(/&\f/g, a[Z]) : a[Z] + " " + n[G];
    }
  }
}, GA = function(I) {
  if (I.type === "decl") {
    var e = I.value;
    e.charCodeAt(0) === 108 && e.charCodeAt(2) === 98 && (I.return = "", I.value = "");
  }
}, dA = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", sA = function(I) {
  return I.type === "comm" && I.children.indexOf(dA) > -1;
}, ZA = function(I) {
  return function(e, c, t) {
    if (!(e.type !== "rule" || I.compat)) {
      var l = e.value.match(/(:first|:nth|:nth-last)-child/g);
      if (l) {
        for (var n = e.parent === t[0], a = n ? t[0].children : t, G = a.length - 1; G >= 0; G--) {
          var X = a[G];
          if (X.line < e.line)
            break;
          if (X.column < e.column) {
            if (sA(X))
              return;
            break;
          }
        }
        l.forEach(function(Z) {
          console.error('The pseudo class "' + Z + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + Z.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, de = function(I) {
  return I.type.charCodeAt(1) === 105 && I.type.charCodeAt(0) === 64;
}, XA = function(I, e) {
  for (var c = I - 1; c >= 0; c--)
    if (!de(e[c]))
      return !0;
  return !1;
}, DC = function(I) {
  I.type = "", I.value = "", I.return = "", I.children = "", I.props = "";
}, mA = function(I, e, c) {
  !de(I) || (I.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), DC(I)) : XA(e, c) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), DC(I)));
};
function se(g, I) {
  switch (Kc(g, I)) {
    case 5103:
      return T + "print-" + g + g;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return T + g + g;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return T + g + oI + g + lg + g + g;
    case 6828:
    case 4268:
      return T + g + lg + g + g;
    case 6165:
      return T + g + lg + "flex-" + g + g;
    case 5187:
      return T + g + D(g, /(\w+).+(:[^]+)/, T + "box-$1$2" + lg + "flex-$1$2") + g;
    case 5443:
      return T + g + lg + "flex-item-" + D(g, /flex-|-self/, "") + g;
    case 4675:
      return T + g + lg + "flex-line-pack" + D(g, /align-content|flex-|-self/, "") + g;
    case 5548:
      return T + g + lg + D(g, "shrink", "negative") + g;
    case 5292:
      return T + g + lg + D(g, "basis", "preferred-size") + g;
    case 6060:
      return T + "box-" + D(g, "-grow", "") + T + g + lg + D(g, "grow", "positive") + g;
    case 4554:
      return T + D(g, /([^-])(transform)/g, "$1" + T + "$2") + g;
    case 6187:
      return D(D(D(g, /(zoom-|grab)/, T + "$1"), /(image-set)/, T + "$1"), g, "") + g;
    case 5495:
    case 3959:
      return D(g, /(image-set\([^]*)/, T + "$1$`$1");
    case 4968:
      return D(D(g, /(.+:)(flex-)?(.*)/, T + "box-pack:$3" + lg + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + T + g + g;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return D(g, /(.+)-inline(.+)/, T + "$1$2") + g;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Vg(g) - 1 - I > 6)
        switch (tg(g, I + 1)) {
          case 109:
            if (tg(g, I + 4) !== 45)
              break;
          case 102:
            return D(g, /(.+:)(.+)-([^]+)/, "$1" + T + "$2-$3$1" + oI + (tg(g, I + 3) == 108 ? "$3" : "$2-$3")) + g;
          case 115:
            return ~kI(g, "stretch") ? se(D(g, "stretch", "fill-available"), I) + g : g;
        }
      break;
    case 4949:
      if (tg(g, I + 1) !== 115)
        break;
    case 6444:
      switch (tg(g, Vg(g) - 3 - (~kI(g, "!important") && 10))) {
        case 107:
          return D(g, ":", ":" + T) + g;
        case 101:
          return D(g, /(.+:)([^;!]+)(;|!.+)?/, "$1" + T + (tg(g, 14) === 45 ? "inline-" : "") + "box$3$1" + T + "$2$3$1" + lg + "$2box$3") + g;
      }
      break;
    case 5936:
      switch (tg(g, I + 11)) {
        case 114:
          return T + g + lg + D(g, /[svh]\w+-[tblr]{2}/, "tb") + g;
        case 108:
          return T + g + lg + D(g, /[svh]\w+-[tblr]{2}/, "tb-rl") + g;
        case 45:
          return T + g + lg + D(g, /[svh]\w+-[tblr]{2}/, "lr") + g;
      }
      return T + g + lg + g + g;
  }
  return g;
}
var VA = function(I, e, c, t) {
  if (I.length > -1 && !I.return)
    switch (I.type) {
      case MI:
        I.return = se(I.value, I.length);
        break;
      case ie:
        return Fg([Dg(I, {
          value: D(I.value, "@", "@" + T)
        })], t);
      case PI:
        if (I.length)
          return qc(I.props, function(l) {
            switch ($c(l, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Fg([Dg(I, {
                  props: [D(l, /:(read-\w+)/, ":" + oI + "$1")]
                })], t);
              case "::placeholder":
                return Fg([Dg(I, {
                  props: [D(l, /:(plac\w+)/, ":" + T + "input-$1")]
                }), Dg(I, {
                  props: [D(l, /:(plac\w+)/, ":" + oI + "$1")]
                }), Dg(I, {
                  props: [D(l, /:(plac\w+)/, lg + "input-$1")]
                })], t);
            }
            return "";
          });
    }
}, pA = [VA], WA = function(I) {
  var e = I.key;
  if (process.env.NODE_ENV !== "production" && !e)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (e === "css") {
    var c = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(c, function(p) {
      var h = p.getAttribute("data-emotion");
      h.indexOf(" ") !== -1 && (document.head.appendChild(p), p.setAttribute("data-s", ""));
    });
  }
  var t = I.stylisPlugins || pA;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(e))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + e + '" was passed');
  var l = {}, n, a = [];
  n = I.container || document.head, Array.prototype.forEach.call(
    document.querySelectorAll('style[data-emotion^="' + e + ' "]'),
    function(p) {
      for (var h = p.getAttribute("data-emotion").split(" "), x = 1; x < h.length; x++)
        l[h[x]] = !0;
      a.push(p);
    }
  );
  var G, X = [oA, GA];
  process.env.NODE_ENV !== "production" && X.push(ZA({
    get compat() {
      return d.compat;
    }
  }), mA);
  {
    var Z, V = [nA, process.env.NODE_ENV !== "production" ? function(p) {
      p.root || (p.return ? Z.insert(p.return) : p.value && p.type !== EI && Z.insert(p.value + "{}"));
    } : iA(function(p) {
      Z.insert(p);
    })], B = bA(X.concat(t, V)), y = function(h) {
      return Fg(tA(h), B);
    };
    G = function(h, x, W, f) {
      Z = W, process.env.NODE_ENV !== "production" && x.map !== void 0 && (Z = {
        insert: function(o) {
          W.insert(o + x.map);
        }
      }), y(h ? h + "{" + x.styles + "}" : x.styles), f && (d.inserted[x.name] = !0);
    };
  }
  var d = {
    key: e,
    sheet: new Pc({
      key: e,
      container: n,
      nonce: I.nonce,
      speedy: I.speedy,
      prepend: I.prepend,
      insertionPoint: I.insertionPoint
    }),
    nonce: I.nonce,
    inserted: l,
    registered: {},
    insert: G
  };
  return d.sheet.hydrate(a), d;
};
function bg() {
  return bg = Object.assign ? Object.assign.bind() : function(g) {
    for (var I = 1; I < arguments.length; I++) {
      var e = arguments[I];
      for (var c in e)
        Object.prototype.hasOwnProperty.call(e, c) && (g[c] = e[c]);
    }
    return g;
  }, bg.apply(this, arguments);
}
var Ze = { exports: {} }, O = {};
var EC;
function vA() {
  if (EC)
    return O;
  EC = 1;
  var g = typeof Symbol == "function" && Symbol.for, I = g ? Symbol.for("react.element") : 60103, e = g ? Symbol.for("react.portal") : 60106, c = g ? Symbol.for("react.fragment") : 60107, t = g ? Symbol.for("react.strict_mode") : 60108, l = g ? Symbol.for("react.profiler") : 60114, n = g ? Symbol.for("react.provider") : 60109, a = g ? Symbol.for("react.context") : 60110, G = g ? Symbol.for("react.async_mode") : 60111, X = g ? Symbol.for("react.concurrent_mode") : 60111, Z = g ? Symbol.for("react.forward_ref") : 60112, V = g ? Symbol.for("react.suspense") : 60113, B = g ? Symbol.for("react.suspense_list") : 60120, y = g ? Symbol.for("react.memo") : 60115, d = g ? Symbol.for("react.lazy") : 60116, p = g ? Symbol.for("react.block") : 60121, h = g ? Symbol.for("react.fundamental") : 60117, x = g ? Symbol.for("react.responder") : 60118, W = g ? Symbol.for("react.scope") : 60119;
  function f(o) {
    if (typeof o == "object" && o !== null) {
      var L = o.$$typeof;
      switch (L) {
        case I:
          switch (o = o.type, o) {
            case G:
            case X:
            case c:
            case l:
            case t:
            case V:
              return o;
            default:
              switch (o = o && o.$$typeof, o) {
                case a:
                case Z:
                case d:
                case y:
                case n:
                  return o;
                default:
                  return L;
              }
          }
        case e:
          return L;
      }
    }
  }
  function z(o) {
    return f(o) === X;
  }
  return O.AsyncMode = G, O.ConcurrentMode = X, O.ContextConsumer = a, O.ContextProvider = n, O.Element = I, O.ForwardRef = Z, O.Fragment = c, O.Lazy = d, O.Memo = y, O.Portal = e, O.Profiler = l, O.StrictMode = t, O.Suspense = V, O.isAsyncMode = function(o) {
    return z(o) || f(o) === G;
  }, O.isConcurrentMode = z, O.isContextConsumer = function(o) {
    return f(o) === a;
  }, O.isContextProvider = function(o) {
    return f(o) === n;
  }, O.isElement = function(o) {
    return typeof o == "object" && o !== null && o.$$typeof === I;
  }, O.isForwardRef = function(o) {
    return f(o) === Z;
  }, O.isFragment = function(o) {
    return f(o) === c;
  }, O.isLazy = function(o) {
    return f(o) === d;
  }, O.isMemo = function(o) {
    return f(o) === y;
  }, O.isPortal = function(o) {
    return f(o) === e;
  }, O.isProfiler = function(o) {
    return f(o) === l;
  }, O.isStrictMode = function(o) {
    return f(o) === t;
  }, O.isSuspense = function(o) {
    return f(o) === V;
  }, O.isValidElementType = function(o) {
    return typeof o == "string" || typeof o == "function" || o === c || o === X || o === l || o === t || o === V || o === B || typeof o == "object" && o !== null && (o.$$typeof === d || o.$$typeof === y || o.$$typeof === n || o.$$typeof === a || o.$$typeof === Z || o.$$typeof === h || o.$$typeof === x || o.$$typeof === W || o.$$typeof === p);
  }, O.typeOf = f, O;
}
var U = {};
var PC;
function yA() {
  return PC || (PC = 1, process.env.NODE_ENV !== "production" && function() {
    var g = typeof Symbol == "function" && Symbol.for, I = g ? Symbol.for("react.element") : 60103, e = g ? Symbol.for("react.portal") : 60106, c = g ? Symbol.for("react.fragment") : 60107, t = g ? Symbol.for("react.strict_mode") : 60108, l = g ? Symbol.for("react.profiler") : 60114, n = g ? Symbol.for("react.provider") : 60109, a = g ? Symbol.for("react.context") : 60110, G = g ? Symbol.for("react.async_mode") : 60111, X = g ? Symbol.for("react.concurrent_mode") : 60111, Z = g ? Symbol.for("react.forward_ref") : 60112, V = g ? Symbol.for("react.suspense") : 60113, B = g ? Symbol.for("react.suspense_list") : 60120, y = g ? Symbol.for("react.memo") : 60115, d = g ? Symbol.for("react.lazy") : 60116, p = g ? Symbol.for("react.block") : 60121, h = g ? Symbol.for("react.fundamental") : 60117, x = g ? Symbol.for("react.responder") : 60118, W = g ? Symbol.for("react.scope") : 60119;
    function f(R) {
      return typeof R == "string" || typeof R == "function" || R === c || R === X || R === l || R === t || R === V || R === B || typeof R == "object" && R !== null && (R.$$typeof === d || R.$$typeof === y || R.$$typeof === n || R.$$typeof === a || R.$$typeof === Z || R.$$typeof === h || R.$$typeof === x || R.$$typeof === W || R.$$typeof === p);
    }
    function z(R) {
      if (typeof R == "object" && R !== null) {
        var yg = R.$$typeof;
        switch (yg) {
          case I:
            var Ng = R.type;
            switch (Ng) {
              case G:
              case X:
              case c:
              case l:
              case t:
              case V:
                return Ng;
              default:
                var $g = Ng && Ng.$$typeof;
                switch ($g) {
                  case a:
                  case Z:
                  case d:
                  case y:
                  case n:
                    return $g;
                  default:
                    return yg;
                }
            }
          case e:
            return yg;
        }
      }
    }
    var o = G, L = X, H = a, og = n, Gg = I, ug = Z, Lg = c, Rg = d, hg = y, vg = e, ag = l, Xg = t, N = V, mg = !1;
    function Bg(R) {
      return mg || (mg = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), b(R) || z(R) === G;
    }
    function b(R) {
      return z(R) === X;
    }
    function m(R) {
      return z(R) === a;
    }
    function F(R) {
      return z(R) === n;
    }
    function k(R) {
      return typeof R == "object" && R !== null && R.$$typeof === I;
    }
    function j(R) {
      return z(R) === Z;
    }
    function P(R) {
      return z(R) === c;
    }
    function $(R) {
      return z(R) === d;
    }
    function M(R) {
      return z(R) === y;
    }
    function Q(R) {
      return z(R) === e;
    }
    function cg(R) {
      return z(R) === l;
    }
    function kg(R) {
      return z(R) === t;
    }
    function xI(R) {
      return z(R) === V;
    }
    U.AsyncMode = o, U.ConcurrentMode = L, U.ContextConsumer = H, U.ContextProvider = og, U.Element = Gg, U.ForwardRef = ug, U.Fragment = Lg, U.Lazy = Rg, U.Memo = hg, U.Portal = vg, U.Profiler = ag, U.StrictMode = Xg, U.Suspense = N, U.isAsyncMode = Bg, U.isConcurrentMode = b, U.isContextConsumer = m, U.isContextProvider = F, U.isElement = k, U.isForwardRef = j, U.isFragment = P, U.isLazy = $, U.isMemo = M, U.isPortal = Q, U.isProfiler = cg, U.isStrictMode = kg, U.isSuspense = xI, U.isValidElementType = f, U.typeOf = z;
  }()), U;
}
(function(g) {
  process.env.NODE_ENV === "production" ? g.exports = vA() : g.exports = yA();
})(Ze);
var Xe = Ze.exports, xA = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, hA = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, me = {};
me[Xe.ForwardRef] = xA;
me[Xe.Memo] = hA;
var RA = !0;
function _I(g, I, e) {
  var c = "";
  return e.split(" ").forEach(function(t) {
    g[t] !== void 0 ? I.push(g[t] + ";") : c += t + " ";
  }), c;
}
var mI = function(I, e, c) {
  var t = I.key + "-" + e.name;
  (c === !1 || RA === !1) && I.registered[t] === void 0 && (I.registered[t] = e.styles);
}, VI = function(I, e, c) {
  mI(I, e, c);
  var t = I.key + "-" + e.name;
  if (I.inserted[e.name] === void 0) {
    var l = e;
    do
      I.insert(e === l ? "." + t : "", l, I.sheet, !0), l = l.next;
    while (l !== void 0);
  }
};
function BA(g) {
  for (var I = 0, e, c = 0, t = g.length; t >= 4; ++c, t -= 4)
    e = g.charCodeAt(c) & 255 | (g.charCodeAt(++c) & 255) << 8 | (g.charCodeAt(++c) & 255) << 16 | (g.charCodeAt(++c) & 255) << 24, e = (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16), e ^= e >>> 24, I = (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16) ^ (I & 65535) * 1540483477 + ((I >>> 16) * 59797 << 16);
  switch (t) {
    case 3:
      I ^= (g.charCodeAt(c + 2) & 255) << 16;
    case 2:
      I ^= (g.charCodeAt(c + 1) & 255) << 8;
    case 1:
      I ^= g.charCodeAt(c) & 255, I = (I & 65535) * 1540483477 + ((I >>> 16) * 59797 << 16);
  }
  return I ^= I >>> 13, I = (I & 65535) * 1540483477 + ((I >>> 16) * 59797 << 16), ((I ^ I >>> 15) >>> 0).toString(36);
}
var NA = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, MC = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, YA = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).", fA = /[A-Z]|^ms/g, Ve = /_EMO_([^_]+?)_([^]*?)_EMO_/g, KI = function(I) {
  return I.charCodeAt(1) === 45;
}, QC = function(I) {
  return I != null && typeof I != "boolean";
}, wI = /* @__PURE__ */ Ge(function(g) {
  return KI(g) ? g : g.replace(fA, "-$&").toLowerCase();
}), GI = function(I, e) {
  switch (I) {
    case "animation":
    case "animationName":
      if (typeof e == "string")
        return e.replace(Ve, function(c, t, l) {
          return sg = {
            name: t,
            styles: l,
            next: sg
          }, t;
        });
  }
  return NA[I] !== 1 && !KI(I) && typeof e == "number" && e !== 0 ? e + "px" : e;
};
if (process.env.NODE_ENV !== "production") {
  var JA = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/, FA = ["normal", "none", "initial", "inherit", "unset"], zA = GI, HA = /^-ms-/, SA = /-(.)/g, _C = {};
  GI = function(I, e) {
    if (I === "content" && (typeof e != "string" || FA.indexOf(e) === -1 && !JA.test(e) && (e.charAt(0) !== e.charAt(e.length - 1) || e.charAt(0) !== '"' && e.charAt(0) !== "'")))
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + e + "\"'`");
    var c = zA(I, e);
    return c !== "" && !KI(I) && I.indexOf("-") !== -1 && _C[I] === void 0 && (_C[I] = !0, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + I.replace(HA, "ms-").replace(SA, function(t, l) {
      return l.toUpperCase();
    }) + "?")), c;
  };
}
var pe = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function Mg(g, I, e) {
  if (e == null)
    return "";
  if (e.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && e.toString() === "NO_COMPONENT_SELECTOR")
      throw new Error(pe);
    return e;
  }
  switch (typeof e) {
    case "boolean":
      return "";
    case "object": {
      if (e.anim === 1)
        return sg = {
          name: e.name,
          styles: e.styles,
          next: sg
        }, e.name;
      if (e.styles !== void 0) {
        var c = e.next;
        if (c !== void 0)
          for (; c !== void 0; )
            sg = {
              name: c.name,
              styles: c.styles,
              next: sg
            }, c = c.next;
        var t = e.styles + ";";
        return process.env.NODE_ENV !== "production" && e.map !== void 0 && (t += e.map), t;
      }
      return jA(g, I, e);
    }
    case "function": {
      if (g !== void 0) {
        var l = sg, n = e(g);
        return sg = l, Mg(g, I, n);
      } else
        process.env.NODE_ENV !== "production" && console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var a = [], G = e.replace(Ve, function(Z, V, B) {
          var y = "animation" + a.length;
          return a.push("const " + y + " = keyframes`" + B.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + y + "}";
        });
        a.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(a, ["`" + G + "`"]).join(`
`) + `

You should wrap it with \`css\` like this:

` + ("css`" + G + "`"));
      }
      break;
  }
  if (I == null)
    return e;
  var X = I[e];
  return X !== void 0 ? X : e;
}
function jA(g, I, e) {
  var c = "";
  if (Array.isArray(e))
    for (var t = 0; t < e.length; t++)
      c += Mg(g, I, e[t]) + ";";
  else
    for (var l in e) {
      var n = e[l];
      if (typeof n != "object")
        I != null && I[n] !== void 0 ? c += l + "{" + I[n] + "}" : QC(n) && (c += wI(l) + ":" + GI(l, n) + ";");
      else {
        if (l === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production")
          throw new Error(pe);
        if (Array.isArray(n) && typeof n[0] == "string" && (I == null || I[n[0]] === void 0))
          for (var a = 0; a < n.length; a++)
            QC(n[a]) && (c += wI(l) + ":" + GI(l, n[a]) + ";");
        else {
          var G = Mg(g, I, n);
          switch (l) {
            case "animation":
            case "animationName": {
              c += wI(l) + ":" + G + ";";
              break;
            }
            default:
              process.env.NODE_ENV !== "production" && l === "undefined" && console.error(YA), c += l + "{" + G + "}";
          }
        }
      }
    }
  return c;
}
var KC = /label:\s*([^\s;\n{]+)\s*(;|$)/g, We;
process.env.NODE_ENV !== "production" && (We = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g);
var sg, Hg = function(I, e, c) {
  if (I.length === 1 && typeof I[0] == "object" && I[0] !== null && I[0].styles !== void 0)
    return I[0];
  var t = !0, l = "";
  sg = void 0;
  var n = I[0];
  n == null || n.raw === void 0 ? (t = !1, l += Mg(c, e, n)) : (process.env.NODE_ENV !== "production" && n[0] === void 0 && console.error(MC), l += n[0]);
  for (var a = 1; a < I.length; a++)
    l += Mg(c, e, I[a]), t && (process.env.NODE_ENV !== "production" && n[a] === void 0 && console.error(MC), l += n[a]);
  var G;
  process.env.NODE_ENV !== "production" && (l = l.replace(We, function(B) {
    return G = B, "";
  })), KC.lastIndex = 0;
  for (var X = "", Z; (Z = KC.exec(l)) !== null; )
    X += "-" + Z[1];
  var V = BA(l) + X;
  return process.env.NODE_ENV !== "production" ? {
    name: V,
    styles: l,
    map: G,
    next: sg,
    toString: function() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: V,
    styles: l,
    next: sg
  };
}, wA = function(I) {
  return I();
}, ve = LI["useInsertionEffect"] ? LI["useInsertionEffect"] : !1, $I = ve || wA, $C = ve || u.exports.useLayoutEffect, LA = {}.hasOwnProperty, qI = /* @__PURE__ */ u.exports.createContext(
  typeof HTMLElement < "u" ? /* @__PURE__ */ WA({
    key: "css"
  }) : null
);
process.env.NODE_ENV !== "production" && (qI.displayName = "EmotionCacheContext");
qI.Provider;
var pI = function(I) {
  return /* @__PURE__ */ u.exports.forwardRef(function(e, c) {
    var t = u.exports.useContext(qI);
    return I(e, t, c);
  });
}, Kg = /* @__PURE__ */ u.exports.createContext({});
process.env.NODE_ENV !== "production" && (Kg.displayName = "EmotionThemeContext");
var qC = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", ge = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", kA = function(I) {
  var e = I.cache, c = I.serialized, t = I.isStringTag;
  return mI(e, c, t), $I(function() {
    return VI(e, c, t);
  }), null;
}, TA = /* @__PURE__ */ pI(function(g, I, e) {
  var c = g.css;
  typeof c == "string" && I.registered[c] !== void 0 && (c = I.registered[c]);
  var t = g[qC], l = [c], n = "";
  typeof g.className == "string" ? n = _I(I.registered, l, g.className) : g.className != null && (n = g.className + " ");
  var a = Hg(l, void 0, u.exports.useContext(Kg));
  if (process.env.NODE_ENV !== "production" && a.name.indexOf("-") === -1) {
    var G = g[ge];
    G && (a = Hg([a, "label:" + G + ";"]));
  }
  n += I.key + "-" + a.name;
  var X = {};
  for (var Z in g)
    LA.call(g, Z) && Z !== "css" && Z !== qC && (process.env.NODE_ENV === "production" || Z !== ge) && (X[Z] = g[Z]);
  return X.ref = e, X.className = n, /* @__PURE__ */ u.exports.createElement(u.exports.Fragment, null, /* @__PURE__ */ u.exports.createElement(kA, {
    cache: I,
    serialized: a,
    isStringTag: typeof t == "string"
  }), /* @__PURE__ */ u.exports.createElement(t, X));
});
process.env.NODE_ENV !== "production" && (TA.displayName = "EmotionCssPropInternal");
const OA = {
  USE_STATE: "useState",
  USE_CONTEXT: "useContext"
};
Object.values(OA);
var UA = {
  name: "@emotion/react",
  version: "11.10.5",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        default: "./dist/emotion-react.esm.js"
      },
      default: "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        default: "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      default: "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      default: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      default: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": "./macro.js"
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.js",
    "macro.d.ts",
    "macro.js.flow"
  ],
  sideEffects: !1,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.10.5",
    "@emotion/cache": "^11.10.5",
    "@emotion/serialize": "^1.1.1",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
    "@emotion/utils": "^1.2.0",
    "@emotion/weak-memoize": "^0.3.0",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: !0
    },
    "@types/react": {
      optional: !0
    }
  },
  devDependencies: {
    "@babel/core": "^7.18.5",
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.10.5",
    "@emotion/css-prettifier": "1.1.1",
    "@emotion/server": "11.10.0",
    "@emotion/styled": "11.10.5",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact",
    exports: {
      envConditions: [
        "browser",
        "worker"
      ],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": "./macro.js"
      }
    }
  }
}, Ie = !1, DA = /* @__PURE__ */ pI(function(g, I) {
  process.env.NODE_ENV !== "production" && !Ie && (g.className || g.css) && (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), Ie = !0);
  var e = g.styles, c = Hg([e], void 0, u.exports.useContext(Kg)), t = u.exports.useRef();
  return $C(function() {
    var l = I.key + "-global", n = new I.sheet.constructor({
      key: l,
      nonce: I.sheet.nonce,
      container: I.sheet.container,
      speedy: I.sheet.isSpeedy
    }), a = !1, G = document.querySelector('style[data-emotion="' + l + " " + c.name + '"]');
    return I.sheet.tags.length && (n.before = I.sheet.tags[0]), G !== null && (a = !0, G.setAttribute("data-emotion", l), n.hydrate([G])), t.current = [n, a], function() {
      n.flush();
    };
  }, [I]), $C(function() {
    var l = t.current, n = l[0], a = l[1];
    if (a) {
      l[1] = !1;
      return;
    }
    if (c.next !== void 0 && VI(I, c.next, !0), n.tags.length) {
      var G = n.tags[n.tags.length - 1].nextElementSibling;
      n.before = G, n.flush();
    }
    I.insert("", c, n, !1);
  }, [I, c.name]), null;
});
process.env.NODE_ENV !== "production" && (DA.displayName = "EmotionGlobal");
function jg() {
  for (var g = arguments.length, I = new Array(g), e = 0; e < g; e++)
    I[e] = arguments[e];
  return Hg(I);
}
var EA = function g(I) {
  for (var e = I.length, c = 0, t = ""; c < e; c++) {
    var l = I[c];
    if (l != null) {
      var n = void 0;
      switch (typeof l) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(l))
            n = g(l);
          else {
            process.env.NODE_ENV !== "production" && l.styles !== void 0 && l.name !== void 0 && console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."), n = "";
            for (var a in l)
              l[a] && a && (n && (n += " "), n += a);
          }
          break;
        }
        default:
          n = l;
      }
      n && (t && (t += " "), t += n);
    }
  }
  return t;
};
function PA(g, I, e) {
  var c = [], t = _I(g, c, e);
  return c.length < 2 ? e : t + I(c);
}
var MA = function(I) {
  var e = I.cache, c = I.serializedArr;
  return $I(function() {
    for (var t = 0; t < c.length; t++)
      VI(e, c[t], !1);
  }), null;
}, QA = /* @__PURE__ */ pI(function(g, I) {
  var e = !1, c = [], t = function() {
    if (e && process.env.NODE_ENV !== "production")
      throw new Error("css can only be used during render");
    for (var X = arguments.length, Z = new Array(X), V = 0; V < X; V++)
      Z[V] = arguments[V];
    var B = Hg(Z, I.registered);
    return c.push(B), mI(I, B, !1), I.key + "-" + B.name;
  }, l = function() {
    if (e && process.env.NODE_ENV !== "production")
      throw new Error("cx can only be used during render");
    for (var X = arguments.length, Z = new Array(X), V = 0; V < X; V++)
      Z[V] = arguments[V];
    return PA(I.registered, t, EA(Z));
  }, n = {
    css: t,
    cx: l,
    theme: u.exports.useContext(Kg)
  }, a = g.children(n);
  return e = !0, /* @__PURE__ */ u.exports.createElement(u.exports.Fragment, null, /* @__PURE__ */ u.exports.createElement(MA, {
    cache: I,
    serializedArr: c
  }), a);
});
process.env.NODE_ENV !== "production" && (QA.displayName = "EmotionClassNames");
if (process.env.NODE_ENV !== "production") {
  var Ce = !0, _A = typeof jest < "u" || typeof vi < "u";
  if (Ce && !_A) {
    var ee = typeof globalThis < "u" ? globalThis : Ce ? window : global, ce = "__EMOTION_REACT_" + UA.version.split(".")[0] + "__";
    ee[ce] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), ee[ce] = !0;
  }
}
function KA() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
const Zg = {
  dark: {
    background: "#676e7e",
    fontColor: "rgb(251 251 251)",
    primary1: "#3133A2",
    primary2: "#47518ff0",
    secondary1: "#515162",
    secondary2: "#636377",
    lightGray: "#a7a7a7",
    surface1: "#5c677f",
    surface2: "#545e77",
    focus: "#616161c6",
    border: "#7d7d7d"
  }
};
var $A = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, qA = /* @__PURE__ */ Ge(
  function(g) {
    return $A.test(g) || g.charCodeAt(0) === 111 && g.charCodeAt(1) === 110 && g.charCodeAt(2) < 91;
  }
), gt = qA, It = function(I) {
  return I !== "theme";
}, Ae = function(I) {
  return typeof I == "string" && I.charCodeAt(0) > 96 ? gt : It;
}, te = function(I, e, c) {
  var t;
  if (e) {
    var l = e.shouldForwardProp;
    t = I.__emotion_forwardProp && l ? function(n) {
      return I.__emotion_forwardProp(n) && l(n);
    } : l;
  }
  return typeof t != "function" && c && (t = I.__emotion_forwardProp), t;
}, le = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`, Ct = function(I) {
  var e = I.cache, c = I.serialized, t = I.isStringTag;
  return mI(e, c, t), $I(function() {
    return VI(e, c, t);
  }), null;
}, ye = function g(I, e) {
  if (process.env.NODE_ENV !== "production" && I === void 0)
    throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
  var c = I.__emotion_real === I, t = c && I.__emotion_base || I, l, n;
  e !== void 0 && (l = e.label, n = e.target);
  var a = te(I, e, c), G = a || Ae(t), X = !G("as");
  return function() {
    var Z = arguments, V = c && I.__emotion_styles !== void 0 ? I.__emotion_styles.slice(0) : [];
    if (l !== void 0 && V.push("label:" + l + ";"), Z[0] == null || Z[0].raw === void 0)
      V.push.apply(V, Z);
    else {
      process.env.NODE_ENV !== "production" && Z[0][0] === void 0 && console.error(le), V.push(Z[0][0]);
      for (var B = Z.length, y = 1; y < B; y++)
        process.env.NODE_ENV !== "production" && Z[0][y] === void 0 && console.error(le), V.push(Z[y], Z[0][y]);
    }
    var d = pI(function(p, h, x) {
      var W = X && p.as || t, f = "", z = [], o = p;
      if (p.theme == null) {
        o = {};
        for (var L in p)
          o[L] = p[L];
        o.theme = u.exports.useContext(Kg);
      }
      typeof p.className == "string" ? f = _I(h.registered, z, p.className) : p.className != null && (f = p.className + " ");
      var H = Hg(V.concat(z), h.registered, o);
      f += h.key + "-" + H.name, n !== void 0 && (f += " " + n);
      var og = X && a === void 0 ? Ae(W) : G, Gg = {};
      for (var ug in p)
        X && ug === "as" || og(ug) && (Gg[ug] = p[ug]);
      return Gg.className = f, Gg.ref = x, /* @__PURE__ */ u.exports.createElement(u.exports.Fragment, null, /* @__PURE__ */ u.exports.createElement(Ct, {
        cache: h,
        serialized: H,
        isStringTag: typeof W == "string"
      }), /* @__PURE__ */ u.exports.createElement(W, Gg));
    });
    return d.displayName = l !== void 0 ? l : "Styled(" + (typeof t == "string" ? t : t.displayName || t.name || "Component") + ")", d.defaultProps = I.defaultProps, d.__emotion_real = d, d.__emotion_base = t, d.__emotion_styles = V, d.__emotion_forwardProp = a, Object.defineProperty(d, "toString", {
      value: function() {
        return n === void 0 && process.env.NODE_ENV !== "production" ? "NO_COMPONENT_SELECTOR" : "." + n;
      }
    }), d.withComponent = function(p, h) {
      return g(p, bg({}, e, h, {
        shouldForwardProp: te(d, h, !0)
      })).apply(void 0, V);
    }, d;
  };
};
function Wg(g, I, { checkForDefaultPrevented: e = !0 } = {}) {
  return function(t) {
    if (g == null || g(t), e === !1 || !t.defaultPrevented)
      return I == null ? void 0 : I(t);
  };
}
function xe(g, I = []) {
  let e = [];
  function c(l, n) {
    const a = /* @__PURE__ */ u.exports.createContext(n), G = e.length;
    e = [
      ...e,
      n
    ];
    function X(V) {
      const { scope: B, children: y, ...d } = V, p = (B == null ? void 0 : B[g][G]) || a, h = u.exports.useMemo(
        () => d,
        Object.values(d)
      );
      return /* @__PURE__ */ u.exports.createElement(p.Provider, {
        value: h
      }, y);
    }
    function Z(V, B) {
      const y = (B == null ? void 0 : B[g][G]) || a, d = u.exports.useContext(y);
      if (d)
        return d;
      if (n !== void 0)
        return n;
      throw new Error(`\`${V}\` must be used within \`${l}\``);
    }
    return X.displayName = l + "Provider", [
      X,
      Z
    ];
  }
  const t = () => {
    const l = e.map((n) => /* @__PURE__ */ u.exports.createContext(n));
    return function(a) {
      const G = (a == null ? void 0 : a[g]) || l;
      return u.exports.useMemo(
        () => ({
          [`__scope${g}`]: {
            ...a,
            [g]: G
          }
        }),
        [
          a,
          G
        ]
      );
    };
  };
  return t.scopeName = g, [
    c,
    et(t, ...I)
  ];
}
function et(...g) {
  const I = g[0];
  if (g.length === 1)
    return I;
  const e = () => {
    const c = g.map(
      (t) => ({
        useScope: t(),
        scopeName: t.scopeName
      })
    );
    return function(l) {
      const n = c.reduce((a, { useScope: G, scopeName: X }) => {
        const V = G(l)[`__scope${X}`];
        return {
          ...a,
          ...V
        };
      }, {});
      return u.exports.useMemo(
        () => ({
          [`__scope${I.scopeName}`]: n
        }),
        [
          n
        ]
      );
    };
  };
  return e.scopeName = I.scopeName, e;
}
function ct(g, I) {
  typeof g == "function" ? g(I) : g != null && (g.current = I);
}
function he(...g) {
  return (I) => g.forEach(
    (e) => ct(e, I)
  );
}
function Qg(...g) {
  return u.exports.useCallback(he(...g), g);
}
const dI = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { children: e, ...c } = g, t = u.exports.Children.toArray(e), l = t.find(tt);
  if (l) {
    const n = l.props.children, a = t.map((G) => G === l ? u.exports.Children.count(n) > 1 ? u.exports.Children.only(null) : /* @__PURE__ */ u.exports.isValidElement(n) ? n.props.children : null : G);
    return /* @__PURE__ */ u.exports.createElement(OI, bg({}, c, {
      ref: I
    }), /* @__PURE__ */ u.exports.isValidElement(n) ? /* @__PURE__ */ u.exports.cloneElement(n, void 0, a) : null);
  }
  return /* @__PURE__ */ u.exports.createElement(OI, bg({}, c, {
    ref: I
  }), e);
});
dI.displayName = "Slot";
const OI = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { children: e, ...c } = g;
  return /* @__PURE__ */ u.exports.isValidElement(e) ? /* @__PURE__ */ u.exports.cloneElement(e, {
    ...lt(c, e.props),
    ref: I ? he(I, e.ref) : e.ref
  }) : u.exports.Children.count(e) > 1 ? u.exports.Children.only(null) : null;
});
OI.displayName = "SlotClone";
const At = ({ children: g }) => /* @__PURE__ */ u.exports.createElement(u.exports.Fragment, null, g);
function tt(g) {
  return /* @__PURE__ */ u.exports.isValidElement(g) && g.type === At;
}
function lt(g, I) {
  const e = {
    ...I
  };
  for (const c in I) {
    const t = g[c], l = I[c];
    /^on[A-Z]/.test(c) ? t && l ? e[c] = (...a) => {
      l(...a), t(...a);
    } : t && (e[c] = t) : c === "style" ? e[c] = {
      ...t,
      ...l
    } : c === "className" && (e[c] = [
      t,
      l
    ].filter(Boolean).join(" "));
  }
  return {
    ...g,
    ...e
  };
}
function nt(g) {
  const I = g + "CollectionProvider", [e, c] = xe(I), [t, l] = e(I, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  }), n = (y) => {
    const { scope: d, children: p } = y, h = dg.useRef(null), x = dg.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ dg.createElement(t, {
      scope: d,
      itemMap: x,
      collectionRef: h
    }, p);
  }, a = g + "CollectionSlot", G = /* @__PURE__ */ dg.forwardRef((y, d) => {
    const { scope: p, children: h } = y, x = l(a, p), W = Qg(d, x.collectionRef);
    return /* @__PURE__ */ dg.createElement(dI, {
      ref: W
    }, h);
  }), X = g + "CollectionItemSlot", Z = "data-radix-collection-item", V = /* @__PURE__ */ dg.forwardRef((y, d) => {
    const { scope: p, children: h, ...x } = y, W = dg.useRef(null), f = Qg(d, W), z = l(X, p);
    return dg.useEffect(() => (z.itemMap.set(W, {
      ref: W,
      ...x
    }), () => void z.itemMap.delete(W))), /* @__PURE__ */ dg.createElement(dI, {
      [Z]: "",
      ref: f
    }, h);
  });
  function B(y) {
    const d = l(g + "CollectionConsumer", y);
    return dg.useCallback(() => {
      const h = d.collectionRef.current;
      if (!h)
        return [];
      const x = Array.from(h.querySelectorAll(`[${Z}]`));
      return Array.from(d.itemMap.values()).sort(
        (z, o) => x.indexOf(z.ref.current) - x.indexOf(o.ref.current)
      );
    }, [
      d.collectionRef,
      d.itemMap
    ]);
  }
  return [
    {
      Provider: n,
      Slot: G,
      ItemSlot: V
    },
    B,
    c
  ];
}
const bt = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], gC = bt.reduce((g, I) => {
  const e = /* @__PURE__ */ u.exports.forwardRef((c, t) => {
    const { asChild: l, ...n } = c, a = l ? dI : I;
    return u.exports.useEffect(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ u.exports.createElement(a, bg({}, n, {
      ref: t
    }));
  });
  return e.displayName = `Primitive.${I}`, {
    ...g,
    [I]: e
  };
}, {});
function it(g) {
  const I = u.exports.useRef(g);
  return u.exports.useEffect(() => {
    I.current = g;
  }), u.exports.useMemo(
    () => (...e) => {
      var c;
      return (c = I.current) === null || c === void 0 ? void 0 : c.call(I, ...e);
    },
    []
  );
}
const at = Boolean(globalThis == null ? void 0 : globalThis.document) ? u.exports.useLayoutEffect : () => {
}, rt = LI["useId".toString()] || (() => {
});
let ut = 0;
function ot(g) {
  const [I, e] = u.exports.useState(rt());
  return at(() => {
    g || e(
      (c) => c ?? String(ut++)
    );
  }, [
    g
  ]), g || (I ? `radix-${I}` : "");
}
function Gt(g, I) {
  typeof g == "function" ? g(I) : g != null && (g.current = I);
}
function Re(...g) {
  return (I) => g.forEach(
    (e) => Gt(e, I)
  );
}
function dt(...g) {
  return u.exports.useCallback(Re(...g), g);
}
function st(g, I = []) {
  let e = [];
  function c(l, n) {
    const a = /* @__PURE__ */ u.exports.createContext(n), G = e.length;
    e = [
      ...e,
      n
    ];
    function X(V) {
      const { scope: B, children: y, ...d } = V, p = (B == null ? void 0 : B[g][G]) || a, h = u.exports.useMemo(
        () => d,
        Object.values(d)
      );
      return /* @__PURE__ */ u.exports.createElement(p.Provider, {
        value: h
      }, y);
    }
    function Z(V, B) {
      const y = (B == null ? void 0 : B[g][G]) || a, d = u.exports.useContext(y);
      if (d)
        return d;
      if (n !== void 0)
        return n;
      throw new Error(`\`${V}\` must be used within \`${l}\``);
    }
    return X.displayName = l + "Provider", [
      X,
      Z
    ];
  }
  const t = () => {
    const l = e.map((n) => /* @__PURE__ */ u.exports.createContext(n));
    return function(a) {
      const G = (a == null ? void 0 : a[g]) || l;
      return u.exports.useMemo(
        () => ({
          [`__scope${g}`]: {
            ...a,
            [g]: G
          }
        }),
        [
          a,
          G
        ]
      );
    };
  };
  return t.scopeName = g, [
    c,
    Zt(t, ...I)
  ];
}
function Zt(...g) {
  const I = g[0];
  if (g.length === 1)
    return I;
  const e = () => {
    const c = g.map(
      (t) => ({
        useScope: t(),
        scopeName: t.scopeName
      })
    );
    return function(l) {
      const n = c.reduce((a, { useScope: G, scopeName: X }) => {
        const V = G(l)[`__scope${X}`];
        return {
          ...a,
          ...V
        };
      }, {});
      return u.exports.useMemo(
        () => ({
          [`__scope${I.scopeName}`]: n
        }),
        [
          n
        ]
      );
    };
  };
  return e.scopeName = I.scopeName, e;
}
const Be = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { children: e, ...c } = g, t = u.exports.Children.toArray(e), l = t.find(mt);
  if (l) {
    const n = l.props.children, a = t.map((G) => G === l ? u.exports.Children.count(n) > 1 ? u.exports.Children.only(null) : /* @__PURE__ */ u.exports.isValidElement(n) ? n.props.children : null : G);
    return /* @__PURE__ */ u.exports.createElement(UI, bg({}, c, {
      ref: I
    }), /* @__PURE__ */ u.exports.isValidElement(n) ? /* @__PURE__ */ u.exports.cloneElement(n, void 0, a) : null);
  }
  return /* @__PURE__ */ u.exports.createElement(UI, bg({}, c, {
    ref: I
  }), e);
});
Be.displayName = "Slot";
const UI = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { children: e, ...c } = g;
  return /* @__PURE__ */ u.exports.isValidElement(e) ? /* @__PURE__ */ u.exports.cloneElement(e, {
    ...Vt(c, e.props),
    ref: I ? Re(I, e.ref) : e.ref
  }) : u.exports.Children.count(e) > 1 ? u.exports.Children.only(null) : null;
});
UI.displayName = "SlotClone";
const Xt = ({ children: g }) => /* @__PURE__ */ u.exports.createElement(u.exports.Fragment, null, g);
function mt(g) {
  return /* @__PURE__ */ u.exports.isValidElement(g) && g.type === Xt;
}
function Vt(g, I) {
  const e = {
    ...I
  };
  for (const c in I) {
    const t = g[c], l = I[c];
    /^on[A-Z]/.test(c) ? t && l ? e[c] = (...a) => {
      l(...a), t(...a);
    } : t && (e[c] = t) : c === "style" ? e[c] = {
      ...t,
      ...l
    } : c === "className" && (e[c] = [
      t,
      l
    ].filter(Boolean).join(" "));
  }
  return {
    ...g,
    ...e
  };
}
const pt = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], Wt = pt.reduce((g, I) => {
  const e = /* @__PURE__ */ u.exports.forwardRef((c, t) => {
    const { asChild: l, ...n } = c, a = l ? Be : I;
    return u.exports.useEffect(() => {
      window[Symbol.for("radix-ui")] = !0;
    }, []), /* @__PURE__ */ u.exports.createElement(a, bg({}, n, {
      ref: t
    }));
  });
  return e.displayName = `Primitive.${I}`, {
    ...g,
    [I]: e
  };
}, {}), Ne = "Popper", [Ye, fe] = st(Ne), [cl, vt] = Ye(Ne), yt = "PopperAnchor", xt = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { __scopePopper: e, virtualRef: c, ...t } = g, l = vt(yt, e), n = u.exports.useRef(null), a = dt(I, n);
  return u.exports.useEffect(() => {
    l.onAnchorChange((c == null ? void 0 : c.current) || n.current);
  }), c ? null : /* @__PURE__ */ u.exports.createElement(Wt.div, bg({}, t, {
    ref: a
  }));
}), ht = "PopperContent";
Ye(ht);
const Rt = xt;
function Bt(g) {
  const I = u.exports.useRef({
    value: g,
    previous: g
  });
  return u.exports.useMemo(() => (I.current.value !== g && (I.current.previous = I.current.value, I.current.value = g), I.current.previous), [
    g
  ]);
}
const Nt = /* @__PURE__ */ u.exports.forwardRef((g, I) => /* @__PURE__ */ u.exports.createElement(gC.span, bg({}, g, {
  ref: I,
  style: {
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    ...g.style
  }
}))), Yt = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], ft = [
  " ",
  "Enter"
], WI = "Select", [Jt, Ft, zt] = nt(WI), [wg, Al] = xe(WI, [
  zt,
  fe
]), Ht = fe(), [tl, Je] = wg(WI);
wg(WI);
const St = "SelectTrigger", jt = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { __scopeSelect: e, disabled: c = !1, ...t } = g, l = Ht(e), n = Je(St, e), a = n.disabled || c, G = Qg(I, n.onTriggerChange), X = Ft(e), [Z, V, B] = Dt((d) => {
    const p = X().filter(
      (W) => !W.disabled
    ), h = p.find(
      (W) => W.value === n.value
    ), x = Et(p, d, h);
    x !== void 0 && n.onValueChange(x.value);
  }), y = () => {
    a || (n.onOpenChange(!0), B());
  };
  return /* @__PURE__ */ u.exports.createElement(Rt, bg({
    asChild: !0
  }, l), /* @__PURE__ */ u.exports.createElement(gC.button, bg({
    type: "button",
    role: "combobox",
    "aria-controls": n.contentId,
    "aria-expanded": n.open,
    "aria-required": n.required,
    "aria-autocomplete": "none",
    dir: n.dir,
    "data-state": n.open ? "open" : "closed",
    disabled: a,
    "data-disabled": a ? "" : void 0,
    "data-placeholder": Ot(n.value) ? "" : void 0
  }, t, {
    ref: G,
    onClick: Wg(t.onClick, (d) => {
      d.currentTarget.focus();
    }),
    onPointerDown: Wg(t.onPointerDown, (d) => {
      const p = d.target;
      p.hasPointerCapture(d.pointerId) && p.releasePointerCapture(d.pointerId), d.button === 0 && d.ctrlKey === !1 && (y(), n.triggerPointerDownPosRef.current = {
        x: Math.round(d.pageX),
        y: Math.round(d.pageY)
      }, d.preventDefault());
    }),
    onKeyDown: Wg(t.onKeyDown, (d) => {
      const p = Z.current !== "";
      !(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && V(d.key), !(p && d.key === " ") && Yt.includes(d.key) && (y(), d.preventDefault());
    })
  })));
}), Fe = "SelectContent", [ll, wt] = wg(Fe);
wg(Fe, {});
const Lt = "SelectGroup";
wg(Lt);
const DI = "SelectItem", [kt, nl] = wg(DI), Tt = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { __scopeSelect: e, value: c, disabled: t = !1, textValue: l, ...n } = g, a = Je(DI, e), G = wt(DI, e), X = a.value === c, [Z, V] = u.exports.useState(l ?? ""), [B, y] = u.exports.useState(!1), d = Qg(I, (x) => {
    var W;
    return (W = G.itemRefCallback) === null || W === void 0 ? void 0 : W.call(G, x, c, t);
  }), p = ot(), h = () => {
    t || (a.onValueChange(c), a.onOpenChange(!1));
  };
  if (c === "")
    throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
  return /* @__PURE__ */ u.exports.createElement(kt, {
    scope: e,
    value: c,
    disabled: t,
    textId: p,
    isSelected: X,
    onItemTextChange: u.exports.useCallback((x) => {
      V((W) => {
        var f;
        return W || ((f = x == null ? void 0 : x.textContent) !== null && f !== void 0 ? f : "").trim();
      });
    }, [])
  }, /* @__PURE__ */ u.exports.createElement(Jt.ItemSlot, {
    scope: e,
    value: c,
    disabled: t,
    textValue: Z
  }, /* @__PURE__ */ u.exports.createElement(gC.div, bg({
    role: "option",
    "aria-labelledby": p,
    "data-highlighted": B ? "" : void 0,
    "aria-selected": X && B,
    "data-state": X ? "checked" : "unchecked",
    "aria-disabled": t || void 0,
    "data-disabled": t ? "" : void 0,
    tabIndex: t ? void 0 : -1
  }, n, {
    ref: d,
    onFocus: Wg(
      n.onFocus,
      () => y(!0)
    ),
    onBlur: Wg(
      n.onBlur,
      () => y(!1)
    ),
    onPointerUp: Wg(n.onPointerUp, h),
    onPointerMove: Wg(n.onPointerMove, (x) => {
      if (t) {
        var W;
        (W = G.onItemLeave) === null || W === void 0 || W.call(G);
      } else
        x.currentTarget.focus({
          preventScroll: !0
        });
    }),
    onPointerLeave: Wg(n.onPointerLeave, (x) => {
      if (x.currentTarget === document.activeElement) {
        var W;
        (W = G.onItemLeave) === null || W === void 0 || W.call(G);
      }
    }),
    onKeyDown: Wg(n.onKeyDown, (x) => {
      var W;
      ((W = G.searchRef) === null || W === void 0 ? void 0 : W.current) !== "" && x.key === " " || (ft.includes(x.key) && h(), x.key === " " && x.preventDefault());
    })
  }))));
});
function Ot(g) {
  return g === "" || g === void 0;
}
const Ut = /* @__PURE__ */ u.exports.forwardRef((g, I) => {
  const { value: e, ...c } = g, t = u.exports.useRef(null), l = Qg(I, t), n = Bt(e);
  return u.exports.useEffect(() => {
    const a = t.current, G = window.HTMLSelectElement.prototype, Z = Object.getOwnPropertyDescriptor(G, "value").set;
    if (n !== e && Z) {
      const V = new Event("change", {
        bubbles: !0
      });
      Z.call(a, e), a.dispatchEvent(V);
    }
  }, [
    n,
    e
  ]), /* @__PURE__ */ u.exports.createElement(Nt, {
    asChild: !0
  }, /* @__PURE__ */ u.exports.createElement("select", bg({}, c, {
    ref: l,
    defaultValue: e
  })));
});
Ut.displayName = "BubbleSelect";
function Dt(g) {
  const I = it(g), e = u.exports.useRef(""), c = u.exports.useRef(0), t = u.exports.useCallback((n) => {
    const a = e.current + n;
    I(a), function G(X) {
      e.current = X, window.clearTimeout(c.current), X !== "" && (c.current = window.setTimeout(
        () => G(""),
        1e3
      ));
    }(a);
  }, [
    I
  ]), l = u.exports.useCallback(() => {
    e.current = "", window.clearTimeout(c.current);
  }, []);
  return u.exports.useEffect(() => () => window.clearTimeout(c.current), []), [
    e,
    t,
    l
  ];
}
function Et(g, I, e) {
  const t = I.length > 1 && Array.from(I).every(
    (X) => X === I[0]
  ) ? I[0] : I, l = e ? g.indexOf(e) : -1;
  let n = Pt(g, Math.max(l, 0));
  t.length === 1 && (n = n.filter(
    (X) => X !== e
  ));
  const G = n.find(
    (X) => X.textValue.toLowerCase().startsWith(t.toLowerCase())
  );
  return G !== e ? G : void 0;
}
function Pt(g, I) {
  return g.map(
    (e, c) => g[(I + c) % g.length]
  );
}
const Mt = jt, Qt = Tt;
function vI() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
Zg.dark.focus, "" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXRlci9yZXBvcy9yZWNvaWwtaW5zcGVjdG9yLXByb2plY3QvcGFja2FnZXMvbnBtLXBhY2thZ2Uvc3JjL2NvbXBvbmVudHMvYmFzZS11aS9TZWxlY3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtHZ0QiLCJmaWxlIjoiL1VzZXJzL3BldGVyL3JlcG9zL3JlY29pbC1pbnNwZWN0b3ItcHJvamVjdC9wYWNrYWdlcy9ucG0tcGFja2FnZS9zcmMvY29tcG9uZW50cy9iYXNlLXVpL1NlbGVjdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24sIENoZXZyb25VcEljb24gfSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtaWNvbnMnO1xuaW1wb3J0ICogYXMgQmFzZVNlbGVjdCBmcm9tICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vLi4vc3R5bGVzL2NvbG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0SXRlbSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNlbGVjdFByb3BzPEl0ZW0gZXh0ZW5kcyBTZWxlY3RJdGVtPiB7XG4gIGl0ZW1zOiBJdGVtW107XG4gIHNlbGVjdGVkSXRlbTogSXRlbSB8IHVuZGVmaW5lZDtcbiAgb25TZWxlY3RlZEl0ZW1DaGFuZ2U6IChzZWxlY3RlZEl0ZW06IEl0ZW0pID0+IHZvaWQ7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdDxJdGVtIGV4dGVuZHMgU2VsZWN0SXRlbT4oe1xuICBpdGVtcyxcbiAgc2VsZWN0ZWRJdGVtLFxuICBvblNlbGVjdGVkSXRlbUNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGRpc2FibGVkLFxufTogU2VsZWN0UHJvcHM8SXRlbT4pIHtcbiAgY29uc3QgaGFuZGxlU2VsZWN0ZWRJdGVtQ2hhbmdlID0gKHNlbGVjdGVkSXRlbVZhbHVlOiBJdGVtWyd2YWx1ZSddKSA9PiB7XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkSXRlbSA9IGl0ZW1zLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gc2VsZWN0ZWRJdGVtVmFsdWVcbiAgICApO1xuICAgIG5leHRTZWxlY3RlZEl0ZW0gJiYgb25TZWxlY3RlZEl0ZW1DaGFuZ2UobmV4dFNlbGVjdGVkSXRlbSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QmFzZVNlbGVjdC5Sb290XG4gICAgICB2YWx1ZT17c2VsZWN0ZWRJdGVtPy52YWx1ZX1cbiAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVNlbGVjdGVkSXRlbUNoYW5nZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICA+XG4gICAgICA8U2VsZWN0VHJpZ2dlcj5cbiAgICAgICAgPEJhc2VTZWxlY3QuVmFsdWUgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfT5cbiAgICAgICAgICB7c2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLm5hbWUgOiBudWxsfVxuICAgICAgICA8L0Jhc2VTZWxlY3QuVmFsdWU+XG4gICAgICAgIDxCYXNlU2VsZWN0Lkljb24+XG4gICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAvPlxuICAgICAgICA8L0Jhc2VTZWxlY3QuSWNvbj5cbiAgICAgIDwvU2VsZWN0VHJpZ2dlcj5cblxuICAgICAgPEJhc2VTZWxlY3QuQ29udGVudFxuICAgICAgICBwb3NpdGlvbj1cInBvcHBlclwiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDM4cHggLTEwcHggcmdiYSgyMiwgMjMsIDI0LCAwLjM1KSxcbiAgICAgICAgICAgIDBweCAxMHB4IDIwcHggLTE1cHggcmdiYSgyMiwgMjMsIDI0LCAwLjIpO1xuICAgICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCYXNlU2VsZWN0LlNjcm9sbFVwQnV0dG9uPlxuICAgICAgICAgIDxDaGV2cm9uVXBJY29uIC8+XG4gICAgICAgIDwvQmFzZVNlbGVjdC5TY3JvbGxVcEJ1dHRvbj5cblxuICAgICAgICA8QmFzZVNlbGVjdC5WaWV3cG9ydFxuICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgIGB9XG4gICAgICAgID5cbiAgICAgICAgICA8QmFzZVNlbGVjdC5Hcm91cFxuICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8T3B0aW9uIGtleT17aXRlbS5uYW1lfSB2YWx1ZT17aXRlbS52YWx1ZX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC9PcHRpb24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0Jhc2VTZWxlY3QuR3JvdXA+XG4gICAgICAgIDwvQmFzZVNlbGVjdC5WaWV3cG9ydD5cblxuICAgICAgICA8QmFzZVNlbGVjdC5TY3JvbGxEb3duQnV0dG9uXG4gICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgYH1cbiAgICAgICAgLz5cbiAgICAgIDwvQmFzZVNlbGVjdC5Db250ZW50PlxuICAgIDwvQmFzZVNlbGVjdC5Sb290PlxuICApO1xufVxuXG5jb25zdCBTZWxlY3RUcmlnZ2VyID0gc3R5bGVkKEJhc2VTZWxlY3QuVHJpZ2dlcilgXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGhlaWdodDogMjVweDtcbiAgZ2FwOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogYmxhY2s7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjMDAwMDAwNzA7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QyZDJkMjtcbiAgfVxuICAmOmZvY3VzIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggJHtjb2xvcnMuZGFyay5mb2N1c307XG4gIH1cbiAgJltkYXRhLXBsYWNlaG9sZGVyXSB7XG4gICAgY29sb3I6IGdyYXk7XG4gIH1cbmA7XG5cbmNvbnN0IE9wdGlvbiA9IHN0eWxlZChCYXNlU2VsZWN0Lkl0ZW0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiBibGFjaztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjVweDtcbiAgcGFkZGluZzogMCAwIDAgNXB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG5cbiAgZm9udC1zaXplOiAxMHB4O1xuXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBsaW5lLWhlaWdodDogMTtcblxuICAmW2RhdGEtZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuICAmW2RhdGEtaGlnaGxpZ2h0ZWRdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5kYXJrLnByaW1hcnkxfTtcbiAgICBjb2xvcjogI2VhZWNmZjtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5gO1xuIl19 */");
Zg.dark.primary1, "" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXRlci9yZXBvcy9yZWNvaWwtaW5zcGVjdG9yLXByb2plY3QvcGFja2FnZXMvbnBtLXBhY2thZ2Uvc3JjL2NvbXBvbmVudHMvYmFzZS11aS9TZWxlY3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJIc0MiLCJmaWxlIjoiL1VzZXJzL3BldGVyL3JlcG9zL3JlY29pbC1pbnNwZWN0b3ItcHJvamVjdC9wYWNrYWdlcy9ucG0tcGFja2FnZS9zcmMvY29tcG9uZW50cy9iYXNlLXVpL1NlbGVjdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24sIENoZXZyb25VcEljb24gfSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtaWNvbnMnO1xuaW1wb3J0ICogYXMgQmFzZVNlbGVjdCBmcm9tICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSAnLi4vLi4vc3R5bGVzL2NvbG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0SXRlbSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNlbGVjdFByb3BzPEl0ZW0gZXh0ZW5kcyBTZWxlY3RJdGVtPiB7XG4gIGl0ZW1zOiBJdGVtW107XG4gIHNlbGVjdGVkSXRlbTogSXRlbSB8IHVuZGVmaW5lZDtcbiAgb25TZWxlY3RlZEl0ZW1DaGFuZ2U6IChzZWxlY3RlZEl0ZW06IEl0ZW0pID0+IHZvaWQ7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdDxJdGVtIGV4dGVuZHMgU2VsZWN0SXRlbT4oe1xuICBpdGVtcyxcbiAgc2VsZWN0ZWRJdGVtLFxuICBvblNlbGVjdGVkSXRlbUNoYW5nZSxcbiAgcGxhY2Vob2xkZXIsXG4gIGRpc2FibGVkLFxufTogU2VsZWN0UHJvcHM8SXRlbT4pIHtcbiAgY29uc3QgaGFuZGxlU2VsZWN0ZWRJdGVtQ2hhbmdlID0gKHNlbGVjdGVkSXRlbVZhbHVlOiBJdGVtWyd2YWx1ZSddKSA9PiB7XG4gICAgY29uc3QgbmV4dFNlbGVjdGVkSXRlbSA9IGl0ZW1zLmZpbmQoXG4gICAgICAoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gc2VsZWN0ZWRJdGVtVmFsdWVcbiAgICApO1xuICAgIG5leHRTZWxlY3RlZEl0ZW0gJiYgb25TZWxlY3RlZEl0ZW1DaGFuZ2UobmV4dFNlbGVjdGVkSXRlbSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QmFzZVNlbGVjdC5Sb290XG4gICAgICB2YWx1ZT17c2VsZWN0ZWRJdGVtPy52YWx1ZX1cbiAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVNlbGVjdGVkSXRlbUNoYW5nZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICA+XG4gICAgICA8U2VsZWN0VHJpZ2dlcj5cbiAgICAgICAgPEJhc2VTZWxlY3QuVmFsdWUgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfT5cbiAgICAgICAgICB7c2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLm5hbWUgOiBudWxsfVxuICAgICAgICA8L0Jhc2VTZWxlY3QuVmFsdWU+XG4gICAgICAgIDxCYXNlU2VsZWN0Lkljb24+XG4gICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAvPlxuICAgICAgICA8L0Jhc2VTZWxlY3QuSWNvbj5cbiAgICAgIDwvU2VsZWN0VHJpZ2dlcj5cblxuICAgICAgPEJhc2VTZWxlY3QuQ29udGVudFxuICAgICAgICBwb3NpdGlvbj1cInBvcHBlclwiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDM4cHggLTEwcHggcmdiYSgyMiwgMjMsIDI0LCAwLjM1KSxcbiAgICAgICAgICAgIDBweCAxMHB4IDIwcHggLTE1cHggcmdiYSgyMiwgMjMsIDI0LCAwLjIpO1xuICAgICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCYXNlU2VsZWN0LlNjcm9sbFVwQnV0dG9uPlxuICAgICAgICAgIDxDaGV2cm9uVXBJY29uIC8+XG4gICAgICAgIDwvQmFzZVNlbGVjdC5TY3JvbGxVcEJ1dHRvbj5cblxuICAgICAgICA8QmFzZVNlbGVjdC5WaWV3cG9ydFxuICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgIGB9XG4gICAgICAgID5cbiAgICAgICAgICA8QmFzZVNlbGVjdC5Hcm91cFxuICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8T3B0aW9uIGtleT17aXRlbS5uYW1lfSB2YWx1ZT17aXRlbS52YWx1ZX0+XG4gICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgPC9PcHRpb24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0Jhc2VTZWxlY3QuR3JvdXA+XG4gICAgICAgIDwvQmFzZVNlbGVjdC5WaWV3cG9ydD5cblxuICAgICAgICA8QmFzZVNlbGVjdC5TY3JvbGxEb3duQnV0dG9uXG4gICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgYH1cbiAgICAgICAgLz5cbiAgICAgIDwvQmFzZVNlbGVjdC5Db250ZW50PlxuICAgIDwvQmFzZVNlbGVjdC5Sb290PlxuICApO1xufVxuXG5jb25zdCBTZWxlY3RUcmlnZ2VyID0gc3R5bGVkKEJhc2VTZWxlY3QuVHJpZ2dlcilgXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGhlaWdodDogMjVweDtcbiAgZ2FwOiA1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBjb2xvcjogYmxhY2s7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAjMDAwMDAwNzA7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2QyZDJkMjtcbiAgfVxuICAmOmZvY3VzIHtcbiAgICBib3gtc2hhZG93OiAwIDAgMCAycHggJHtjb2xvcnMuZGFyay5mb2N1c307XG4gIH1cbiAgJltkYXRhLXBsYWNlaG9sZGVyXSB7XG4gICAgY29sb3I6IGdyYXk7XG4gIH1cbmA7XG5cbmNvbnN0IE9wdGlvbiA9IHN0eWxlZChCYXNlU2VsZWN0Lkl0ZW0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiBibGFjaztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMjVweDtcbiAgcGFkZGluZzogMCAwIDAgNXB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG5cbiAgZm9udC1zaXplOiAxMHB4O1xuXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBsaW5lLWhlaWdodDogMTtcblxuICAmW2RhdGEtZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuICAmW2RhdGEtaGlnaGxpZ2h0ZWRdIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5kYXJrLnByaW1hcnkxfTtcbiAgICBjb2xvcjogI2VhZWNmZjtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5gO1xuIl19 */");
function IC() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
function _t() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
const ne = "6px", Kt = /* @__PURE__ */ jg("::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background-color:#929292;border-radius:", ne, ";}::-webkit-scrollbar-thumb:hover{background-color:#a6a6a6;}::-webkit-scrollbar-track{background-color:", Zg.dark.lightGray, ";border-radius:", ne, ";}" + (process.env.NODE_ENV === "production" ? "" : ";label:scrollbarCss;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXRlci9yZXBvcy9yZWNvaWwtaW5zcGVjdG9yLXByb2plY3QvcGFja2FnZXMvbnBtLXBhY2thZ2Uvc3JjL3N0eWxlcy9zY3JvbGxiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTStCIiwiZmlsZSI6Ii9Vc2Vycy9wZXRlci9yZXBvcy9yZWNvaWwtaW5zcGVjdG9yLXByb2plY3QvcGFja2FnZXMvbnBtLXBhY2thZ2Uvc3JjL3N0eWxlcy9zY3JvbGxiYXIudHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJy4vY29sb3JzJztcblxuY29uc3QgU0NST0xMX0JBUl9CT1JERVJfUkFESVVTID0gJzZweCc7XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxiYXJDc3MgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIHdpZHRoOiA1cHg7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTI5MjkyO1xuICAgIGJvcmRlci1yYWRpdXM6ICR7U0NST0xMX0JBUl9CT1JERVJfUkFESVVTfTtcbiAgfVxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTZhNmE2O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMuZGFyay5saWdodEdyYXl9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7U0NST0xMX0JBUl9CT1JERVJfUkFESVVTfTtcbiAgfVxuYDtcbiJdfQ== */");
Zg.dark.primary1, "" + (process.env.NODE_ENV === "production" ? "" : ";label:buttonCss;"), process.env.NODE_ENV;
Zg.dark.primary1, Zg.dark.primary2, "" + (process.env.NODE_ENV === "production" ? "" : ";label:buttonPrimaryColor;"), process.env.NODE_ENV;
Zg.dark.secondary1, Zg.dark.secondary2, "" + (process.env.NODE_ENV === "production" ? "" : ";label:buttonSecondaryColor;"), process.env.NODE_ENV;
function ze() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
function yI() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
function He() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
function $t() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
function CC() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
function qt() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
function Se() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
function eC() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
const be = [{
  key: "countState",
  value: 1,
  stateType: "atom"
}, {
  key: "countSecond",
  value: 3,
  stateType: "atom"
}, {
  key: "sumState",
  value: 2,
  stateType: "atom"
}], Cg = {
  name: "root",
  children: [{
    name: "App",
    hookTypes: ["useState"],
    children: [{
      name: "RecoilRoot",
      hookTypes: ["useContext"],
      children: [{
        name: "Counter",
        hookTypes: ["useContext", "useContext", "useEffect", "useRef", "useRef", "useEffect", "useContext", "useCallback", "useCallback", "useMemo", "useCallback", "useSyncExternalStore", "useContext", "useCallback", "useState"],
        children: [],
        states: [3],
        recoilStates: be
      }, {
        name: "LocalCounter",
        hookTypes: ["useState", "useState"],
        children: [],
        states: [3, ""],
        recoilStates: be
      }],
      states: []
    }],
    states: [1]
  }]
}, gg = (g) => {
  const I = {
    ...g
  };
  return I.children && (I.children = I.children.map((e) => gg(e))), I.hookTypes && (I.hookTypes = I.hookTypes.map(() => Math.random() > 0.5 ? "useState" : "useCallback")), I.name && (I.name = I.name + Math.random().toString(36).substring(7)), I.states && (I.states = I.states.map((e) => typeof e == "number" ? Math.floor(Math.random() * 10) : e)), I;
};
gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg), gg(Cg);
Zg.dark.surface1, "" + (process.env.NODE_ENV === "production" ? "" : ";label:containerCss;"), process.env.NODE_ENV;
function gl() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
function Il() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
process.env.NODE_ENV;
Zg.dark.fontColor, Zg.dark.background, "" + (process.env.NODE_ENV === "production" ? "" : ";label:GlobalCss;"), process.env.NODE_ENV;
