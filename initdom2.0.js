/**
 * @Copyright 2018[MR.JXV]
 * @Create-time 2018-3-5
 */
;
(function(global, factory) {
	factory()
})(this, function() {
	var initDOM;
	var userAgent = window.navigator.userAgent;
	var isChorme = /Chrome/g.test(userAgent);
	var isFirefox = /Firefox/g.test(userAgent);
	var isIE = /MSIE/g.test(userAgent);
	var version = '2.0 SUPPORT IE';
	var $px = 'px';
	var $unit = /px|pt|pc|em|rem|%|cm|mm|ex/g;
	var $space = /\s/ig;
	var $spaceTo = /^\s*/g;
	var $auto = 'auto';
	var $IERE = new RegExp("MSIE (\\d+\\.\\d+);");
	var isIE8 = function isIE8() {
			if (isIE) {
				$IERE.test(userAgent);
				var IEVersion = parseFloat(RegExp["$1"]);
				return IEVersion === 8
			};
			return false
		};
	var isIE9 = function isIE9() {
			if (isIE) {
				$IERE.test(userAgent);
				var IEVersion = parseFloat(RegExp["$1"]);
				return IEVersion === 9
			};
			return false
		};

	function $empty(val) {
		return val == undefined && val == null
	};

	function isElementNode(val) {
		return val.nodeType ? (val.nodeType == 1 ? true : false) : false
	};

	function isCommentNode(val) {
		return val.nodeType ? (val.nodeType == 8 ? true : false) : false
	};

	function isTextNode(val) {
		return val.nodeType ? (val.nodeType == 3 ? true : false) : false
	};

	function type(val) {
		return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
	};

	function isWindow(val) {
		return val instanceof window.constructor
	};

	function isDocument(val) {
		return val instanceof document.constructor
	};

	function isArray(val) {
		return type(val) == 'array'
	};

	function isArrayLike(val) {
		return typeof val != 'string' && typeof val != 'number' && !isWindow(val) && 'length' in val
	};

	function isEmptyObject(val) {
		for (var item in val) {
			return false
		};
		return true
	};

	function toArray(arrayLike) {
		if (isArrayLike(arrayLike)) {
			if (!isIE) {
				return [].slice.call(arrayLike)
			} else {
				var _range = [];
				for (var i = 0, l = arrayLike.length; i < l; i++) {
					_range.push(arrayLike[i])
				};
				return _range
			}
		}
	};

	function hump(text) {
		if (/-/ig.test(text)) {
			var splitLine = text.split('-');
			var splitText = [];
			splitText.push(splitLine[0]);
			for (var j = 0, k = splitLine.length; j < k; j++) {
				if (j != 0) {
					splitText.push(splitLine[j].substring(0, 1).toUpperCase() + splitLine[j].substring(1))
				}
			};
			return splitText.join('')
		} else {
			return text
		}
	};

	function space(val) {
		return String(val).replace($space, '')
	};

	function spaceTo(val) {
		return String(val).replace($spaceTo, '')
	};
	initDOM = function initDOM(selector) {
		if (!$empty(selector)) {
			if (isElementNode(selector)) {
				this.node = [selector]
			} else if (isWindow(selector) || isDocument(selector)) {
				this.node = [document]
			} else if (type(selector) == 'string') {
				this.node = toArray(document.querySelectorAll(selector))
			} else if (isArray(selector)) {
				this.node = selector
			}
		} else {
			console.error('Illegal operation');
			return
		}
	};

	function extend(methods) {
		foreach(methods, function($methods, $methodsName) {
			if (type($methods) == 'function') {
				initDOM.prototype[$methodsName] = $methods
			}
		})
	};

	function setRange(val) {
		var v = [];
		if (type(val) == 'number') {
			for (var i = 0, l = val; i < l; i++) {
				v.push(i)
			};
			return v
		}
	};

	function unique(val) {
		var v = [];
		if (val[0] != undefined) v.push(val[0]);
		for (var i = 1; i < val.length; i++) {
			if (val.indexOf(val[i]) == i) v.push(val[i])
		};
		return v
	};

	function hasCssUnits(val) {
		return /px|pt|pc|em|rem|%|cm|mm|ex/g.test(val)
	};

	function hasAuto(val) {
		return String(val).indexOf('auto') != -1
	};

	function hasNone(val) {
		return String(val).indexOf('none') != -1
	};

	function foreach(array, callBack) {
		if (isArray(array)) {
			var _arr = toArray(array);
			for (var i = 0, l = _arr.length; i < l; i++) {
				callBack.call(_arr[i], _arr[i], i)
			}
		} else {
			for (var item in array) {
				callBack(array[item], item)
			}
		}
	};

	function getElementNode(callBack) {
		var $node = this.node;
		foreach($node, function(item, index) {
			callBack.call(item, item, index)
		})
	};

	function getElementStyle(el, propertyName) {
		return !isIE ? getComputedStyle(el, null)[propertyName] : el.currentStyle[propertyName]
	};

	function _getElementStyle(propertyName) {
		return getElementStyle(this.node[0], propertyName)
	};

	function setElementStyle(el, property) {
		if (el && property) {
			switch (type(property)) {
			case 'string':
				;
				(function(el, property) {
					foreach(property.split(';'), function(cssItem, index) {
						var _cssItem = cssItem.split(':');
						if (_cssItem != '') {
							var _cssName = space(_cssItem[0]);
							var _cssValue = space(_cssItem[1]);
							el.style[_cssName] = _cssValue
						}
					})
				})(el, property);
				break;
			case 'object':
				foreach(property, function(cssValue, cssName) {
					el.style[cssName] = cssValue
				});
				break
			}
		}
	};

	function _setElementStyle(property) {
		getElementNode.call(this, function(node, index) {
			setElementStyle(node, property)
		})
	};

	function formartStyle(property) {
		var _style = [];
		foreach(property.split(';'), function(cssItem, index) {
			var _cssItem = cssItem.split(':');
			if (_cssItem != '') {
				var _$cssItem = {};
				_$cssItem[hump(space(_cssItem[0]))] = spaceTo(_cssItem[1]);
				_style.push(_$cssItem)
			}
		});
		return _style
	};

	function autoAdd(val) {
		if (val == undefined || val == null) {
			return 'auto'
		} else {
			return hasCssUnits(val) ? val : val + $px
		}
	};

	function argumentsParam(param, length, defaultUnits) {
		var _param = toArray(param);
		var _range = setRange(length);
		var $param = [];
		foreach(_range, function(item, index) {
			var _valItem = _param[index];
			if (!$empty(_valItem)) {
				$param.push(hasAuto(_valItem) ? _valItem : autoAdd(_valItem))
			} else {
				$param.push(defaultUnits)
			}
		});
		return $param
	};

	function _getOpacity(el) {
		if (!isIE8()) {
			return parseFloat(getElementStyle(el, 'opacity'))
		} else {
			var _filter = getElementStyle(el, 'filter'),
				_aplha = parseFloat(_filter.match(/[0-9]+/g)[0]);
			return (_aplha / 100)
		}
	};

	function _setOpacity(el, intensity) {
		if (!isIE8()) {
			setElementStyle(el, {
				opacity: intensity < 0 || intensity > 1 ? 1 : intensity
			})
		} else {
			intensity = intensity * 100;
			setElementStyle(el, {
				'filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (intensity < 0 || intensity > 100 ? 100 : intensity) + ')'
			})
		}
	};
	extend({
		css: function css(property) {
			_setElementStyle.call(this, property);
			return this
		},
		block: function block() {
			_setElementStyle.call(this, {
				display: 'block'
			});
			return this
		},
		none: function none() {
			_setElementStyle.call(this, {
				display: 'none'
			});
			return this
		},
		flex: function flex() {
			if (!isIE8()) {
				_setElementStyle.call(this, {
					display: 'flex'
				})
			};
			return this
		},
		box: function box() {
			if (!isIE8()) {
				_setElementStyle.call(this, {
					display: '-webkit-box'
				})
			};
			return this
		},
		inline: function inline() {
			_setElementStyle.call(this, {
				display: 'inline'
			});
			return this
		},
		table: function table() {
			_setElementStyle.call(this, {
				display: 'table'
			});
			return this
		},
		hide: function hide() {
			_setElementStyle.call(this, {
				visibility: 'hidden'
			});
			return this
		},
		show: function show() {
			_setElementStyle.call(this, {
				visibility: 'visible'
			});
			return this
		},
		absolute: function absolute() {
			_setElementStyle.call(this, {
				position: 'absolute'
			});
			return this
		},
		relative: function relative() {
			_setElementStyle.call(this, {
				position: 'relative'
			});
			return this
		},
		fixed: function fixed() {
			_setElementStyle.call(this, {
				position: 'fixed'
			});
			return this
		},
		setOpacity: function setOpacity(intensity) {
			getElementNode.call(this, function(node, index) {
				_setOpacity(node, intensity)
			});
			return this
		},
		setWidth: function setWidth(val) {
			_setElementStyle.call(this, {
				width: autoAdd(val)
			});
			return this
		},
		setHeight: function setHeight(val) {
			_setElementStyle.call(this, {
				height: autoAdd(val)
			});
			return this
		},
		setSize: function setSize(width, height) {
			var sizeObject = argumentsParam(arguments, 2, 'auto');
			this.css({
				width: sizeObject[0],
				height: sizeObject[1]
			});
			return this
		},
		setMargin: function setMargin(top, right, bottom, left) {
			var marginObject = argumentsParam(arguments, 4, 'auto');
			this.css({
				margin: marginObject.join(' ')
			});
			return this
		},
		setPadding: function setPadding(top, right, bottom, left) {
			var paddingObject = argumentsParam(arguments, 4, 'auto');
			this.css({
				padding: paddingObject.join(' ')
			});
			return this
		},
		setTop: function setTop(val) {
			_setElementStyle.call(this, {
				top: autoAdd(val)
			});
			return this
		},
		setRight: function setRight(val) {
			_setElementStyle.call(this, {
				right: autoAdd(val)
			});
			return this
		},
		setBottom: function setBottom(val) {
			_setElementStyle.call(this, {
				bottom: autoAdd(val)
			});
			return this
		},
		setLeft: function setLeft(val) {
			_setElementStyle.call(this, {
				left: autoAdd(val)
			});
			return this
		},
		setPosition: function setPosition(top, right, bottom, left) {
			var positionObject = argumentsParam(arguments, 4, 'auto');
			this.css({
				top: positionObject[0],
				right: positionObject[1],
				bottom: positionObject[2],
				left: positionObject[3]
			});
			return this
		},
		zIndex: function zIndex(val) {
			if (!$empty(val) && !isNaN(val) && val != '') {
				_setElementStyle.call(this, {
					zIndex: parseInt(val)
				});
				return this
			} else {
				return _getElementStyle.call(this, 'z-index')
			}
		},
		setFontSize: function setFontSize(val) {
			_setElementStyle.call(this, {
				fontSize: autoAdd(val)
			});
			return this
		},
		setBackgroundColor: function setBackgroundColor(color) {
			if (!(String(color).indexOf('rgba') != -1 && isIE8())) {
				_setElementStyle.call(this, {
					backgroundColor: color
				})
			};
			return this
		},
		setBorderRadius: function setBorderRadius(topLeft, topRight, bottomRight, bottomLeft) {
			var radiusObject = argumentsParam(arguments, 4, 'auto');
			if (!isIE8()) {
				this.css({
					borderTopLeftRadius: radiusObject[0],
					borderTopRightRadius: radiusObject[1],
					borderBottomRightRadius: radiusObject[2],
					borderBottomLeftRadius: radiusObject[3]
				})
			};
			return this
		},
		center: function center() {
			this.fixed().setPosition(0, 0, 0, 0).setMargin('auto');
			return this
		}
	});

	function outPutMargin(type) {
		var margin = {},
			that = this;
		foreach('top,right,bottom,left'.split(','), function(name, index) {
			margin[name] = _getElementStyle.call(that, (type + '-' + name))
		});
		return margin
	};

	function formatColor(colorStr) {
		var colroRE = /rgba|rgb|\(|\)|\s/ig;
		if (colroRE.test(colorStr)) {
			var _$color = colorStr.replace(colroRE, '').split(',');
			return {
				r: parseInt(_$color[0]),
				g: parseInt(_$color[1]),
				b: parseInt(_$color[2]),
				a: _$color[3] != undefined ? parseFloat(_$color[3]) : 1
			}
		} else {
			return colorStr
		}
	};
	extend({
		display: function display() {
			return _getElementStyle.call(this, 'display')
		},
		getOpacity: function getOpacity() {
			return _getOpacity(this.node[0])
		},
		getWidth: function getWidth() {
			return _getElementStyle.call(this, 'width')
		},
		getHeight: function getHeight() {
			return _getElementStyle.call(this, 'height')
		},
		getSize: function getSize() {
			var _size = {};
			_size.width = this.getWidth();
			_size.height = this.getHeight();
			return _size
		},
		getMargin: function getMargin() {
			return outPutMargin.call(this, 'margin')
		},
		getPadding: function getPadding() {
			return outPutMargin.call(this, 'padding')
		},
		getTop: function getTop() {
			return _getElementStyle.call(this, 'top')
		},
		getRight: function getRight() {
			return _getElementStyle.call(this, 'right')
		},
		getBottom: function getBottom() {
			return _getElementStyle.call(this, 'bottom')
		},
		getLeft: function getLeft() {
			return _getElementStyle.call(this, 'left')
		},
		getPosition: function getPosition() {
			var _position = {};
			_position.top = this.getTop();
			_position.right = this.getRight();
			_position.bottom = this.getBottom();
			_position.left = this.getLeft();
			return _position
		},
		getFontSize: function getFontSize() {
			return _getElementStyle.call(this, 'font-size')
		},
		getFontColor: function getFontColor() {
			return formatColor(_getElementStyle.call(this, 'color'))
		},
		getBackgroundColor: function getBackgroundColor() {
			return formatColor(_getElementStyle.call(this, 'backgroundColor'))
		},
		getBorderRadius: function setBorderRadius() {
			var _radius = {};
			if (!isIE8()) {
				_radius.topLeft = _getElementStyle.call(this, 'border-top-left-radius');
				_radius.topRight = _getElementStyle.call(this, 'border-top-right-radius');
				_radius.bottomRight = _getElementStyle.call(this, 'border-bottom-right-radius');
				_radius.bottomLeft = _getElementStyle.call(this, 'border-bottom-left-radius')
			};
			return _radius
		}
	});

	function $setAttr(el, attrName, attrValue) {
		el.setAttribute(space(attrName), space(attrValue))
	};
	extend({
		getAttr: function getAttr(attrName) {
			return this.node[0].getAttribute(space(attrName))
		},
		setAttr: function setAttr(attrName, attrValue) {
			getElementNode.call(this, function(node, index) {
				$setAttr(node, attrName, attrValue)
			});
			return this
		},
		setAttrList: function setAttrList(listMap) {
			if (type(listMap) == 'object') {
				for (var name in listMap) {
					this.setAttr(name, listMap[name])
				}
			};
			return this
		},
		removeAttr: function remvoeAttr(attrName) {
			getElementNode.call(this, function(node, index) {
				node.removeAttribute(space(attrName))
			})
		},
		attributes: function attributes() {
			var _attr = [];
			if (!isIE8()) {
				foreach(this.node[0].attributes, function(item, index) {
					_attr.push({
						name: item.name,
						value: item.value
					})
				})
			};
			return _attr
		},
		hasAttr: function hasAttr(attrName) {
			return this.node[0].hasAttribute(space(attrName))
		},
		lineStyle: function lineStyle() {
			return formartStyle(this.getAttr('style'))
		},
		data: function data() {
			var _data = {};
			if (!isIE8()) {
				foreach(this.attributes(), function(item, index) {
					if (/data/ig.test(item.name)) {
						var dataName = hump(item.name.replace(/data-/, ''));
						_data[dataName] = item.value
					}
				})
			};
			return _data
		}
	});

	function $classList(el) {
		if (!isIE8() && !isIE9()) {
			return toArray(el.classList)
		} else {
			var _class = el.className.split(' '),
				_$class = [];
			foreach(_class, function(item, index) {
				if (item != '' && item != undefined) {
					_$class.push(item)
				}
			});
			return _$class
		}
	};

	function $hasClass(el, className) {
		var _className = space(className);
		if (!isIE8() && !isIE9()) {
			return el.classList.contains(_className)
		} else {
			return el.className.match(new RegExp('(\\s|^)' + _className + '(\\s|$)')) != null
		}
	};

	function $addClass(el, className) {
		var _className = space(className);
		if (!isIE8() && !isIE9()) {
			el.classList.add(_className)
		} else {
			if (!$hasClass(el, _className)) {
				el.className = el.className + ' ' + _className
			}
		}
	};

	function $removeClass(el, className) {
		var _className = space(className);
		if (!isIE8() && !isIE9()) {
			el.classList.remove(_className)
		} else {
			var reg = new RegExp('(\\s|^)' + _className + '(\\s|$)');
			if ($hasClass(el, _className)) {
				node.className = el.className.replace(reg, '')
			}
		}
	};
	extend({
		classList: function classList() {
			return $classList(this.node[0])
		},
		addClass: function addClass(className) {
			getElementNode.call(this, function(node, index) {
				$addClass(node, className)
			});
			return this
		},
		addClassList: function addClassList(list) {
			if (isArray(list)) {
				var that = this;
				foreach(list, function(item, index) {
					that.addClass(item)
				})
			};
			return this
		},
		removeClass: function removeClass(className) {
			getElementNode.call(this, function(node, index) {
				$removeClass(node, className)
			});
			return this
		},
		hasClass: function hasClass(className) {
			var _node = this.node[0];
			return $hasClass(this.node[0], className)
		},
		toggleClass: function toggleClass(className) {
			getElementNode.call(this, function(node, index) {
				if ($hasClass(node, className)) {
					$removeClass(node, className)
				} else {
					$addClass(node, className)
				}
			});
			return this
		}
	});
	extend({
		html: function html(str) {
			if(!$empty(str)){
				getElementNode.call(this, function(node, index) {
					node.innerHTML = str
				});
				return this
			}else{
				return this.node[0].innerHTML	
			}			
		},
		value: function value(str) {
			if(!$empty(str)){
				getElementNode.call(this, function(node, index) {
					if (node.value) {
						node.value = str
					}
				});
				return this	
			}else{
				return this.node[0].value	
			}			
		},
		text: function text(str) {
			if (!isIE8()) {
				if(!$empty(str)){
					getElementNode.call(this, function(node, index) {
						node.textContent = str
					});return this
				}else{
					return this.node[0].textContent	
				}				
			}
		},		
		addHtml: function addHtml(str) {
			getElementNode.call(this, function(node, index) {
				node.innerHTML = (node.innerHTML + str)
			});
			return this
		},
		addValue: function addValue(str) {
			getElementNode.call(this, function(node, index) {
				if (node.value) {
					node.value = (node.value + str)
				}
			});
			return this
		},
		addText: function addText(str) {
			if (!isIE8()) {
				getElementNode.call(this, function(node, index) {
					node.textContent = (node.textContent + str)
				})
			};
			return this
		},
		clear: function clear() {
			getElementNode.call(this, function(node, index) {
				node['innerHTML'] = node['textContent'] = node['value'] = ''
			});
			return this
		}
	});

	function $splitArray(array) {
		var _newArray = [];
		foreach(array, function(_array, index) {
			foreach(_array, function(item, index) {
				_newArray.push(item)
			})
		});
		return _newArray
	};

	function $getIndex(el) {
		var i = 0;
		while ((el = el.previousSibling) !== null) {
			if (el.nodeType === 1) {
				i += 1
			}
		};
		return i
	};

	function $getChildren(el) {
		var _children = [];
		var _childNodes = toArray(el.childNodes);
		foreach(_childNodes, function(node, index) {
			if (node.nodeType === 1) {
				_children.push(node)
			}
		});
		return _children
	};

	function $getNextElement(el) {
		var next = el.nextSibling;
		while (next && next.nodeType != 1) {
			next = next.nextSibling
		};
		return next
	};

	function $getPrevElement(el) {
		var prev = el.previousSibling;
		while (prev && prev.nodeType != 1) {
			prev = prev.previousSibling
		};
		return prev
	};

	function $getFirstElement(el) {
		return $getChildren(el)[0]
	};

	function $getLastElement(el) {
		var _list = $getChildren(el);
		return _list[_list.length - 1]
	};

	function _nodeQueryParent() {
		var _parent = [];
		getElementNode.call(this, function(node, index) {
			if (node.parentNode) {
				_parent.push(node.parentNode)
			}
		});
		return unique(_parent)
	};

	function _nodeQueryChildren() {
		var _children = [];
		getElementNode.call(this, function(node, index) {
			if ($getChildren(node).length != 0) {
				_children.push($getChildren(node))
			}
		});
		return unique($splitArray(_children))
	};

	function _nodeQueryNext() {
		var _next = [];
		getElementNode.call(this, function(node, index) {
			var $next = $getNextElement(node);
			_next.push($next)
		});
		return unique(_next)
	};

	function _nodeQueryPrev() {
		var _prev = [];
		getElementNode.call(this, function(node, index) {
			var $prev = $getPrevElement(node);
			_prev.push($prev)
		});
		return unique(_prev)
	};

	function _nodeQueryNextAll() {
		var _nextAll = [];
		getElementNode.call(this, function(node, index) {
			while ($getNextElement(node)) {
				var next = $getNextElement(node);
				_nextAll.push(next);
				node = next
			}
		});
		return unique(_nextAll)
	};

	function _nodeQueryPrevAll() {
		var _prevAll = [];
		getElementNode.call(this, function(node, index) {
			while ($getPrevElement(node)) {
				var prev = $getPrevElement(node);
				_prevAll.push(prev);
				node = prev
			}
		});
		return unique(_prevAll)
	};

	function _nodeQueryFirst() {
		var _first = [];
		getElementNode.call(this, function(node, index) {
			_first.push($getFirstElement(node))
		});
		return unique(_first)
	};

	function _nodeQueryLast() {
		var _last = [];
		getElementNode.call(this, function(node, index) {
			_last.push($getLastElement(node))
		});
		return unique(_last)
	};

	function _nodeQuerySibling() {
		var _sibling = [];
		getElementNode.call(this, function(node, index) {
			var _findex = $getIndex(node);
			var _fchildren = $getChildren(node.parentNode);
			foreach(_fchildren, function($node, index) {
				if (_findex != index) {
					_sibling.push($node)
				}
			})
		});
		return unique(_sibling)
	};

	function _nodeQueryFind(selector) {
		var _find = [];
		if (!$empty(selector) && typeof selector == 'string') {
			getElementNode.call(this, function(node, index) {
				_find.push(toArray(node.querySelectorAll(selector)))
			})
		};
		return unique($splitArray(_find))
	}
	function $coverObject(node) {
		if (isArray(node) && node.length != 0) {
			return new initDOM(node)
		}
	};
	extend({
		info: function info() {
			var that = this.node[0];
			return {
				name: that.nodeName.toLowerCase(),
				type: that.nodeType,
				value: that.nodeValue
			}
		},
		index: function index() {
			return $getIndex(this.node[0])
		},
		parent: function parent() {
			return $coverObject(_nodeQueryParent.call(this))
		},
		children: function children() {
			return $coverObject(_nodeQueryChildren.call(this))
		},
		prev: function prev() {
			return $coverObject(_nodeQueryPrev.call(this))
		},
		next: function next() {
			return $coverObject(_nodeQueryNext.call(this))
		},
		first: function first() {
			return $coverObject(_nodeQueryFirst.call(this))
		},
		last: function last() {
			return $coverObject(_nodeQueryLast.call(this))
		},
		prevAll: function prevAll() {
			return $coverObject(_nodeQueryPrevAll.call(this))
		},
		nextAll: function nextAll() {
			return $coverObject(_nodeQueryNextAll.call(this))
		},
		sub: function sub(index) {
			var _length = this.node.length,
				_index = parseInt(index);
			if (!(_index < 0 || _index > _length)) {
				return $coverObject([this.node[_index]])
			}
		},
		silbing: function silbing() {
			return $coverObject(_nodeQuerySibling.call(this))
		},		
		find: function find(selector) {
			return $coverObject(_nodeQueryFind.call(this, selector))
		},
		copy: function copy() {
			return $coverObject([this.node[0].cloneNode(true)])
		},
		clone: function clone() {
			return this.node[0].cloneNode(true)
		},
		remove: function remove() {
			var that = this;
			getElementNode.call(this, function(node, index) {
				node.parentNode.removeChild(node);
				that.node.shift()
			})
		},
		repalce: function replace(newNode) {
			getElementNode.call(this, function(node, index) {
				node.parentNode.replaceChild(newNode.cloneNode(true), node)
			});
			return this
		},
		options: function options() {
			var that = this.node[0];
			if (!isIE8() && !isIE9()) {
				if (that.options) {
					var _options = that.options,
						_current = _options.selectedIndex;
					return {
						options: toArray(_options),
						currentIndex: _current,
						currentOptions: _options[_current]
					}
				}
			}
		},
		appendStart: function appendStart(newNode) {
			if (isElementNode(newNode)) {
				getElementNode.call(this, function(node, index) {
					var _first = $getFirstElement(node);
					if (_first == null && _first == undefined) {
						node.appendChild(newNode.cloneNode(true))
					} else {
						node.insertBefore(newNode.cloneNode(true), _first)
					}
				})
			};
			return this
		},
		appendEnd: function appendEnd(newNode) {
			if (isElementNode(newNode)) {
				getElementNode.call(this, function(node, index) {
					node.appendChild(newNode.cloneNode(true))
				})
			};
			return this
		},
		insert: function insert(startNode, newNode) {
			if (isElementNode(startNode) && isElementNode(newNode)) {
				getElementNode.call(this, function(node, index) {
					node.insertBefore(newNode.cloneNode(true), startNode)
				})
			};
			return this
		},
		focus: function focus() {
			var that = this.node[0];
			if (that.focus) {
				that.focus()
			}
		},
		blur: function blur() {
			var that = this.node[0];
			if (that.blur) {
				that.blur()
			}
		},
		toSource: function toSource() {
			return this.node[0]
		}
	});

	function $getClient(el) {
		var _client = {},
			_item = el;
		_client.width = _item.clientWidth;
		_client.height = _item.clientHeight;
		_client.top = _item.offsetTop;
		_client.left = _item.offsetLeft;
		_client.borderTopWidth = _item.clientTop;
		_client.borderLeftWidth = _item.clientLeft;
		_client.scrollHeight = _item.scrollHeight;
		_client.scrollTop = _item.scrollTop;
		_client.parentTop = _getClientParent(_item).top;
		_client.parentLeft = _getClientParent(_item).left;
		return _client
	};

	function _getClientParent(el) {
		function getParentOffset(el, type) {
			var value = 0;
			if (el.offsetParent) {
				while (el.offsetParent) {
					value += type == 'top' ? el.offsetTop : el.offsetLeft;
					el = el.offsetParent
				}
			} else if (el[type == 'top' ? 'top' : 'left']) {
				value += el[type == 'top' ? 'top' : 'left']
			};
			return value
		};
		return {
			top: getParentOffset(el, 'top'),
			left: getParentOffset(el, 'left')
		}
	};

	function addEvent(target, eventType, eventCallBack, capture) {		
		if (target.nodeType && (target.nodeType === 1 || target.nodeType === 9)) {
			if (typeof eventType == 'string') {
				if (typeof eventCallBack == 'function') {
					if (window.addEventListener) {						
						target.addEventListener(eventType, eventCallBack, capture || false)
					} else if (window.attachEvent) {
						target.attachEvent('on' + eventType, eventCallBack)
					}
				} else {
					console.warn('missing event callback function, or not a function.')
				}
			} else {
				console.error('the type of event should be String.')
			}
		}
	};

	function removeEvent(target, eventType, eventCallBack, capture) {
		if (target.nodeType && (target.nodeType === 1 || target.nodeType === 9)) {
			if (typeof eventType == 'string') {
				if (typeof eventCallBack == 'function') {
					if (window.removeEventListener) {
						target.removeEventListener(eventType, eventCallBack, capture || false)
					} else if (window.detachEvent) {
						target.detachEvent('on' + eventType, eventCallBack)
					}
				} else {
					console.warn('missing event callback function, or not a function.')
				}
			} else {
				console.error('the type of event should be String.')
			}
		}
	};

	function _eventTrigger(type, callBack) {
		var that = this;
		getElementNode.call(this, function(item, index) {
			item['on' + type] = function(event) {				
				callBack.call(this,event)
			}
		})
	};

	function _bindEventTrigger(type, callBack) {
		var that = this;
		getElementNode.call(this, function(item, index) {			
			addEvent(item, type, callBack, false)
		})
	};

	function _removeBindEventTirgger(type, callBack) {
		var that = this;
		getElementNode.call(this, function(item, index) {
			removeEvent(item, type, callBack, false)
		})
	};
	extend({
		click: function click(callBack) {
			_eventTrigger.call(this, 'click', callBack);
			return this
		},
		mouseover: function mouseover(callBack) {
			_eventTrigger.call(this, 'click', callBack);
			return this
		},
		mouseout: function mouseout(callBack) {
			_eventTrigger.call(this, 'mouseout', callBack);
			return this
		},
		mousedown: function mousedown(callBack) {
			_eventTrigger.call(this, 'mousedown', callBack);
			return this
		},
		mouseup: function mouseup(callBack) {
			_eventTrigger.call(this, 'mouseup', callBack);
			return this
		},
		dbclick: function dbclick(callBack) {
			_eventTrigger.call(this, 'dbclick', callBack);
			return this
		},
		scroll: function scroll(callBack) {
			_eventTrigger.call(this, 'scroll', callBack);
			return this
		},
		bind: function bind(eventType, callBack) {			
			_bindEventTrigger.call(this, eventType, callBack);
			return this
		},
		bindList: function bindList(eventObject) {
			if (!isEmptyObject(eventObject)) {
				for (var eventType in eventObject) {
					_bindEventTrigger.call(this, eventType, eventObject[eventType])
				}
			};
			return this
		},
		hover: function hover(hoverIn, houverOut) {
			_eventTrigger.call(this, 'mouseover', hoverIn);
			_eventTrigger.call(this, 'mouseout', houverOut);
			return this
		},
		removeBind: function removeBind(eventType, callBack) {
			_removeBindEventTirgger.call(this, eventType, callBack);
			return this
		},
		client: function client() {
			return $getClient(this.node[0])
		},
		checked: function checked() {
			getElementNode.call(this, function(node, index) {
				node.checked = true
			});
			return this
		},		
	});

	function _animation(el, property, transition, duration, callBack) {
		var opacityToken = 'opacity';
		clearInterval(el.timer);
		el.timer = setInterval(function() {
			var stop = true;
			for (var attr in property) {
				var val = 0;
				val = (attr == opacityToken) ? parseFloat(_getOpacity(el, opacityToken) * 100) : parseInt(getElementStyle(el, attr));
				var speed = ((property[attr] - val) / (transition || 30));
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (val != property[attr]) {
					stop = false
				}
				if (attr == opacityToken) {
					_setOpacity(el, (val + speed) / 100)
				} else {
					var _style = {};
					_style[attr] = autoAdd(val + speed);
					setElementStyle(el, _style)
				}
			}
			if (stop) {
				clearInterval(el.timer);
				if (typeof callBack == 'function') {
					callBack.call(new initDOM(el))
				}
			}
		}, duration || 5)
	};
	extend({
		animation: function animation(property, transition, duration, callBack) {
			getElementNode.call(this, function(node, index) {
				_animation(node, property, transition, duration, callBack)
			});
			return this
		},
		fadeIn: function fadeIn(transition, duration, callBack) {
			this.setOpacity(0);
			this.animation({
				opacity: 100
			}, transition || 30, duration || 5, callBack);
			return this
		},
		fadeOut: function fadeOut(transition, duration, callBack) {
			this.setOpacity(100);
			this.animation({
				opacity: 0
			}, transition || 30, duration || 5, callBack);
			return this
		}
	});
	extend({
		each:function each(callBack){
			foreach(this.node,function(node,index){
				callBack.call(node,node,index)
			});return this
		},
		$addNode:function $addNode(el){
			if(isElementNode(el) || el.nodeType === 9){				
				this.node.push(el);
				this.node = unique(this.node);
			};return this
		},
		$insertNode:function $insertNode(el){
			if(isElementNode(el)){
				this.node.insert(el)	
			};return this
		},
		$after:function $after(){
			this.node.after();
			return this
		},
		$before:function $before(){
			this.node.before();
			return this
		},
		$merge:function $merge(mergeObj){			
			if(mergeObj.node != undefined){
				this.node = merge(this.node,mergeObj.node);			
			}else if(isElementNode(mergeObj)){
				this.$addNode(mergeObj)				
			};return this
		},
		$firstNode:function $firstNode(){
			this.node[0];			
		}
	});
	function merge(originalObj,mergeObj){		
		var _mergeObj = mergeObj;		
		if(isArray(originalObj) && isArray(mergeObj)){
			foreach(_mergeObj,function(item,index){
				originalObj.push(item)
			})
		};		
		return unique(originalObj)
	};
	initDOM.prototype.version = '2.0 debug version';
	initDOM.prototype.extend = extend;
	window.query = function query(selector) {
		return new initDOM(selector)
	};
	Array.prototype.after = function(){
		this.shift();
		return this
	};		
	Array.prototype.before = function(){
		this.pop();
		return this
	}
	Array.prototype.insert = function(item){
		this.unshift(item);
		return this
	}	
	window._initDOM = window.initDOM = initDOM
})