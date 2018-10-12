<<<<<<< HEAD
!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var e=i();for(var s in e)("object"==typeof exports?exports:t)[s]=e[s]}}(this,function(){return function(t){function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}({0:function(t,i,e){t.exports=e(77)},1:function(t,i){"use strict";var e={isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},funcOrValue:function(t,i){if("function"==typeof t){var e=t.call(i);return e}return t},execFuncs:function(t,i,s){if(t&&(e.isArray(s)||(s=[s])),"function"==typeof t)return t.apply(i,s);if(e.isArray(t)){var n=[];return t.forEach(function(t){n.push(t&&t.apply(i,s))}),n}},blend:["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],pointInRect:function(t,i,e,s,n,r){return!(t<e||t>s||i<n||i>r)},firstValuable:function(t,i,e){return"undefined"==typeof t?"undefined"==typeof i?e:i:t}};t.exports=e},2:function(t,i){"use strict";var e=3.141593;t.exports=function(t,i,s,n,r,o){var a=r?-r/180*e:0,h=t,c=i;return r&&(h=(t-s)*Math.cos(a)-(i-n)*Math.sin(a)+s,c=(t-s)*Math.sin(a)+(i-n)*Math.cos(a)+n),o?[h,c]:{x:h,y:c}}},28:function(t,i,e){"use strict";var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){Object.create=Object.create||function(t){function i(){}return i.prototype=t,new i};var t;t=i;var e,n,r=function(t,i){},o=function(t,i){},a=function(t,i){return t<i?t:i},h=function(t,i){return t>i?t:i};"object"===("undefined"==typeof window?"undefined":s(window))&&window.navigator.userAgent.indexOf("Firefox")>-1?(e=Math.min,n=Math.max):(e=a,n=h);var c=function(t,i){return t<i?t+" "+i:i+" "+t},p=function(t,i){for(var e=0;e<t.length;e++)if(t[e]===i)return t[e]=t[t.length-1],void t.length--},u=function(t,i,e){var s=B(i,e),n=_(m(s,B(t,e))/F(s));return j(e,k(s,n))},l=function(t,i,e,s,n,r){var o=e-n,a=s-r,h=_(w(o,a,t-n,i-r)/V(o,a));return new x(n+o*h,r+a*h)};t.momentForCircle=function(t,i,e,s){return t*(.5*(i*i+e*e)+F(s))},t.areaForCircle=function(t,i){return Math.PI*Math.abs(t*t-i*i)},t.momentForSegment=function(t,i,e){var s=k(j(i,e),.5);return t*(E(e,i)/12+F(s))},t.areaForSegment=function(t,i,e){return e*(Math.PI*e+2*q(t,i))},t.momentForPoly=function(t,i,e){for(var s=0,n=0,r=i.length,o=0;o<r;o+=2){var a=i[o]+e.x,h=i[o+1]+e.y,c=i[(o+2)%r]+e.x,p=i[(o+3)%r]+e.y,u=I(c,p,a,h),l=w(a,h,a,h)+w(a,h,c,p)+w(c,p,c,p);s+=u*l,n+=u}return t*s/(6*n)},t.areaForPoly=function(t){for(var i=0,e=0,s=t.length;e<s;e+=2)i+=M(new x(t[e],t[e+1]),new x(t[(e+2)%s],t[(e+3)%s]));return-i/2},t.centroidForPoly=function(t){for(var i=0,e=new x(0,0),s=0,n=t.length;s<n;s+=2){var r=new x(t[s],t[s+1]),o=new x(t[(s+2)%n],t[(s+3)%n]),a=M(r,o);i+=a,e=j(e,k(j(r,o),a))}return k(e,1/(3*i))},t.recenterPoly=function(i){for(var e=t.centroidForPoly(i),s=0;s<i.length;s+=2)i[s]-=e.x,i[s+1]-=e.y},t.momentForBox=function(t,i,e){return t*(i*i+e*e)/12},t.momentForBox2=function(i,e){var s=e.r-e.l,n=e.t-e.b,r=k([e.l+e.r,e.b+e.t],.5);return t.momentForBox(i,s,n)+i*F(r)};var y=t.loopIndexes=function(t){var i,e,s,n,r=0,o=0;i=s=t[0],e=n=t[1];for(var a=t.length>>1,h=1;h<a;h++){var c=t[2*h],p=t[2*h+1];c<i||c==i&&p<e?(i=c,e=p,r=h):(c>s||c==s&&p>n)&&(s=c,n=p,o=h)}return[r,o]},b=function(t,i,e){var s=t[2*i];t[2*i]=t[2*e],t[2*e]=s,s=t[2*i+1],t[2*i+1]=t[2*e+1],t[2*e+1]=s},f=function(t,i,e,s,n,r){if(0===e)return 0;for(var o=0,a=i,h=B(n,s),c=r*S(h),p=i,u=i+e-1;p<=u;){var l=new x(t[2*p],t[2*p+1]),y=M(h,B(l,s));y>c?(y>o&&(o=y,a=p),p++):(b(t,p,u),u--)}return a!=i&&b(t,i,a),p-i},v=function t(i,e,s,n,r,o,a,h){if(n<0)return 0;if(0==n)return e[2*h]=o.x,e[2*h+1]=o.y,1;var c=f(e,s,n,r,o,i),p=new x(e[2*s],e[2*s+1]),u=t(i,e,s+1,c-1,r,p,o,h),l=h+u++;e[2*l]=o.x,e[2*l+1]=o.y;var y=f(e,s+c,n-c,o,a,i),b=new x(e[2*(s+c)],e[2*(s+c)+1]);return u+t(i,e,s+c+1,y-1,o,b,a,h+u)};t.convexHull=function(t,i,e){if(i)for(var s=0;s<t.length;s++)i[s]=t[s];else i=t;var n=y(t),r=n[0],a=n[1];if(r==a)return i.length=2,i;b(i,0,r),b(i,1,0==a?r:a);var h=new x(i[0],i[1]),c=new x(i[2],i[3]),p=t.length>>1,u=v(e,i,2,p-2,h,c,h,1)+1;return i.length=2*u,o(et(i),"Internal error: cpConvexHull() and cpPolyValidate() did not agree.Please report this error with as much info as you can."),i};var d=function(t,i,s){return e(n(t,i),s)},_=function(t){return n(0,e(t,1))},x=t.Vect=function(t,i){this.x=t,this.y=i};t.v=function(t,i){return new x(t,i)};var g=t.vzero=new x(0,0),m=t.v.dot=function(t,i){return t.x*i.x+t.y*i.y},w=function(t,i,e,s){return t*e+i*s},S=t.v.len=function(t){return Math.sqrt(m(t,t))},A=t.v.len2=function(t,i){return Math.sqrt(t*t+i*i)},j=(t.v.eql=function(t,i){return t.x===i.x&&t.y===i.y},t.v.add=function(t,i){return new x(t.x+i.x,t.y+i.y)});x.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this};var B=t.v.sub=function(t,i){return new x(t.x-i.x,t.y-i.y)};x.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this};var C=t.v.neg=function(t){return new x(-t.x,-t.y)};x.prototype.neg=function(){return this.x=-this.x,this.y=-this.y,this};var k=t.v.mult=function(t,i){return new x(t.x*i,t.y*i)};x.prototype.mult=function(t){return this.x*=t,this.y*=t,this};var M=t.v.cross=function(t,i){return t.x*i.y-t.y*i.x},I=function(t,i,e,s){return t*s-i*e},P=t.v.perp=function(t){return new x(-t.y,t.x)},L=(t.v.pvrperp=function(t){return new x(t.y,-t.x)},t.v.project=function(t,i){return k(i,m(t,i)/F(i))});x.prototype.project=function(t){return this.mult(m(this,t)/F(t)),this};var $=t.v.rotate=function(t,i){return new x(t.x*i.x-t.y*i.y,t.x*i.y+t.y*i.x)};x.prototype.rotate=function(t){return this.x=this.x*t.x-this.y*t.y,this.y=this.x*t.y+this.y*t.x,this};var R=t.v.unrotate=function(t,i){return new x(t.x*i.x+t.y*i.y,t.y*i.x-t.x*i.y)},F=t.v.lengthsq=function(t){return m(t,t)},V=t.v.lengthsq2=function(t,i){return t*t+i*i},N=t.v.lerp=function(t,i,e){return j(k(t,1-e),k(i,e))},T=t.v.normalize=function(t){return k(t,1/S(t))},Q=t.v.normalize_safe=function(t){return 0===t.x&&0===t.y?g:T(t)},O=t.v.clamp=function(t,i){return m(t,t)>i*i?k(T(t),i):t},q=(t.v.lerpconst=function(t,i,e){return j(t,O(B(i,t),e))},t.v.dist=function(t,i){return S(B(t,i))}),E=t.v.distsq=function(t,i){return F(B(t,i))},H=(t.v.near=function(t,i,e){return E(t,i)<e*e},t.v.slerp=function(t,i,e){var s=Math.acos(m(t,i));if(s){var n=1/Math.sin(s);return j(k(t,Math.sin((1-e)*s)*n),k(i,Math.sin(e*s)*n))}return t}),D=(t.v.slerpconst=function(t,i,s){var n=Math.acos(m(t,i));return H(t,i,e(s,n)/n)},t.v.forangle=function(t){return new x(Math.cos(t),Math.sin(t))},t.v.toangle=function(t){return Math.atan2(t.y,t.x)},t.v.str=function(t){return"("+t.x.toFixed(3)+", "+t.y.toFixed(3)+")"},0),z=t.BB=function(t,i,e,s){this.l=t,this.b=i,this.r=e,this.t=s,D++};t.bb=function(t,i,e,s){return new z(t,i,e,s)};var G=function(t,i){return new z(t.x-i,t.y-i,t.x+i,t.y+i)},W=function(t,i,e,s,n){return t.l<=s&&i<=t.r&&t.b<=n&&e<=t.t},J=0,Y=(t.NO_GROUP=0,t.ALL_LAYERS=-1);t.resetShapeIdCounter=function(){J=0};var U=t.Shape=function(t){this.body=t,this.bb_l=this.bb_b=this.bb_r=this.bb_t=0,this.hashid=J++,this.sensor=!1,this.e=0,this.u=0,this.surface_v=g,this.collision_type=0,this.group=0,this.layers=Y,this.space=null,this.collisionCode=this.collisionCode};U.prototype.setElasticity=function(t){this.e=t},U.prototype.setFriction=function(t){this.body.activate(),this.u=t},U.prototype.setLayers=function(t){this.body.activate(),this.layers=t},U.prototype.setSensor=function(t){this.body.activate(),this.sensor=t},U.prototype.setCollisionType=function(t){this.body.activate(),this.collision_type=t},U.prototype.getBody=function(){return this.body},U.prototype.active=function(){return this.body&&this.body.shapeList.indexOf(this)!==-1},U.prototype.setBody=function(t){r(!this.active(),"You cannot change the body on an active shape. You must remove the shape from the space before changing the body."),this.body=t},U.prototype.cacheBB=function(){return this.update(this.body.p,this.body.rot)},U.prototype.update=function(t,i){r(!isNaN(i.x),"Rotation is NaN"),r(!isNaN(t.x),"Position is NaN"),this.cacheData(t,i)},U.prototype.pointQuery=function(t){var i=this.nearestPointQuery(t);if(i.d<0)return i},U.prototype.getBB=function(){return new z(this.bb_l,this.bb_b,this.bb_r,this.bb_t)};var K=function(t,i,e){this.shape=t,this.p=i,this.d=e},X=function(t,i,e){this.shape=t,this.t=i,this.n=e};X.prototype.hitPoint=function(t,i){return N(t,i,this.t)},X.prototype.hitDist=function(t,i){return q(t,i)*this.t};var Z=t.CircleShape=function(t,i,e){this.c=this.tc=e,this.r=i,this.type="circle",U.call(this,t)};Z.prototype=Object.create(U.prototype),Z.prototype.cacheData=function(t,i){var e=this.tc=$(this.c,i).add(t),s=this.r;this.bb_l=e.x-s,this.bb_b=e.y-s,this.bb_r=e.x+s,this.bb_t=e.y+s},Z.prototype.nearestPointQuery=function(t){var i=t.x-this.tc.x,e=t.y-this.tc.y,s=A(i,e),n=this.r,r=new x(this.tc.x+i*n/s,this.tc.y+e*n/s);return new K(this,r,s-n)};var tt=function(t,i,e,s,n,r){s=B(s,i),n=B(n,i);var o=m(s,s)-2*m(s,n)+m(n,n),a=-2*m(s,s)+2*m(s,n),h=m(s,s)-e*e,c=a*a-4*o*h;if(c>=0){var p=(-a-Math.sqrt(c))/(2*o);if(0<=p&&p<=1)return new X(t,p,T(N(s,n,p)))}};Z.prototype.segmentQuery=function(t,i){return tt(this,this.tc,this.r,t,i)};var it=t.SegmentShape=function(t,i,e,s){this.a=i,this.b=e,this.n=P(T(B(e,i))),this.ta=this.tb=this.tn=null,this.r=s,this.a_tangent=g,this.b_tangent=g,this.type="segment",U.call(this,t)};it.prototype=Object.create(U.prototype),it.prototype.cacheData=function(t,i){this.ta=j(t,$(this.a,i)),this.tb=j(t,$(this.b,i)),this.tn=$(this.n,i);var e,s,n,r;this.ta.x<this.tb.x?(e=this.ta.x,s=this.tb.x):(e=this.tb.x,s=this.ta.x),this.ta.y<this.tb.y?(n=this.ta.y,r=this.tb.y):(n=this.tb.y,r=this.ta.y);var o=this.r;this.bb_l=e-o,this.bb_b=n-o,this.bb_r=s+o,this.bb_t=r+o},it.prototype.nearestPointQuery=function(t){var i=u(t,this.ta,this.tb),e=t.x-i.x,s=t.y-i.y,n=A(e,s),r=this.r,o=n?j(i,k(new x(e,s),r/n)):i;return new K(this,o,n-r)},it.prototype.segmentQuery=function(t,i){var e=this.tn,s=m(B(this.ta,t),e),n=this.r,r=s>0?C(e):e,o=B(k(r,n),t),a=j(this.ta,o),h=j(this.tb,o),c=B(i,t);if(M(c,a)*M(c,h)<=0){var p=s+(s>0?-n:n),u=-p,l=m(c,e)-p;if(u*l<0)return new X(this,u/(u-l),r)}else if(0!==n){var y=tt(this,this.ta,this.r,t,i),b=tt(this,this.tb,this.r,t,i);return y?b&&b.t<y.t?b:y:b}},it.prototype.setNeighbors=function(t,i){this.a_tangent=B(t,this.a),this.b_tangent=B(i,this.b)},it.prototype.setEndpoints=function(t,i){this.a=t,this.b=i,this.n=P(T(B(i,t)))};var et=function(t){for(var i=t.length,e=0;e<i;e+=2){var s=t[e],n=t[e+1],r=t[(e+2)%i],o=t[(e+3)%i],a=t[(e+4)%i],h=t[(e+5)%i];if(I(r-s,o-n,a-r,h-o)>0)return!1}return!0},st=t.PolyShape=function(t,i,e){this.setVerts(i,e),this.type="poly",U.call(this,t)};st.prototype=Object.create(U.prototype);var nt=function(t,i){this.n=t,this.d=i};nt.prototype.compare=function(t){return m(this.n,t)-this.d},st.prototype.setVerts=function(t,i){r(t.length>=4,"Polygons require some verts"),r("number"==typeof t[0],"Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])"),r(et(t),"Polygon is concave or has a reversed winding. Consider using cpConvexHull()");var e=t.length,s=e>>1;this.verts=new Array(e),this.tVerts=new Array(e),this.planes=new Array(s),this.tPlanes=new Array(s);for(var n=0;n<e;n+=2){var o=t[n]+i.x,a=t[n+1]+i.y,h=t[(n+2)%e]+i.x,c=t[(n+3)%e]+i.y,p=T(P(new x(h-o,c-a)));this.verts[n]=o,this.verts[n+1]=a,this.planes[n>>1]=new nt(p,w(p.x,p.y,o,a)),this.tPlanes[n>>1]=new nt(new x(0,0),0)}};var rt=(t.BoxShape=function(t,i,e){var s=i/2,n=e/2;return rt(t,new z(-s,-n,s,n))},t.BoxShape2=function(t,i){var e=[i.l,i.b,i.l,i.t,i.r,i.t,i.r,i.b];return new st(t,e,g)});st.prototype.transformVerts=function(t,i){for(var s=this.verts,r=this.tVerts,o=1/0,a=-(1/0),h=1/0,c=-(1/0),p=0;p<s.length;p+=2){var u=s[p],l=s[p+1],y=t.x+u*i.x-l*i.y,b=t.y+u*i.y+l*i.x;r[p]=y,r[p+1]=b,o=e(o,y),a=n(a,y),h=e(h,b),c=n(c,b)}this.bb_l=o,this.bb_b=h,this.bb_r=a,this.bb_t=c},st.prototype.transformAxes=function(t,i){for(var e=this.planes,s=this.tPlanes,n=0;n<e.length;n++){var r=$(e[n].n,i);s[n].n=r,s[n].d=m(t,r)+e[n].d}},st.prototype.cacheData=function(t,i){this.transformAxes(t,i),this.transformVerts(t,i)},st.prototype.nearestPointQuery=function(t){for(var i=this.tPlanes,e=this.tVerts,s=e[e.length-2],n=e[e.length-1],r=1/0,o=g,a=!1,h=0;h<i.length;h++){i[h].compare(t)>0&&(a=!0);var c=e[2*h],p=e[2*h+1],u=l(t.x,t.y,s,n,c,p),y=q(t,u);y<r&&(r=y,o=u),s=c,n=p}return new K(this,o,a?r:-r)},st.prototype.segmentQuery=function(t,i){for(var e=this.tPlanes,s=this.tVerts,n=e.length,r=2*n,o=0;o<n;o++){var a=e[o].n,h=m(t,a);if(!(e[o].d>h)){var c=m(i,a),p=(e[o].d-h)/(c-h);if(!(p<0||1<p)){var u=N(t,i,p),l=-M(a,u),y=-I(a.x,a.y,s[2*o],s[2*o+1]),b=-I(a.x,a.y,s[(2*o+2)%r],s[(2*o+3)%r]);if(y<=l&&l<=b)return new X(this,p,a)}}}},st.prototype.valueOnAxis=function(t,i){for(var s=this.tVerts,n=w(t.x,t.y,s[0],s[1]),r=2;r<s.length;r+=2)n=e(n,w(t.x,t.y,s[r],s[r+1]));return n-i},st.prototype.containsVert=function(t,i){for(var e=this.tPlanes,s=0;s<e.length;s++){var n=e[s].n,r=w(n.x,n.y,t,i)-e[s].d;if(r>0)return!1}return!0},st.prototype.containsVertPartial=function(t,i,e){for(var s=this.tPlanes,n=0;n<s.length;n++){var r=s[n].n;if(!(m(r,e)<0)){var o=w(r.x,r.y,t,i)-s[n].d;if(o>0)return!1}}return!0},st.prototype.getNumVerts=function(){return this.verts.length/2},st.prototype.getVert=function(t){return new x(this.verts[2*t],this.verts[2*t+1])};var ot=t.Body=function(t,i){this.p=new x(0,0),this.vx=this.vy=0,this.f=new x(0,0),this.w=0,this.t=0,this.v_limit=1/0,this.w_limit=1/0,this.v_biasx=this.v_biasy=0,this.w_bias=0,this.space=null,this.shapeList=[],this.arbiterList=null,this.constraintList=null,this.nodeRoot=null,this.nodeNext=null,this.nodeIdleTime=0,this.setMass(t),this.setMoment(i),this.rot=new x(0,0),this.setAngle(0)};ot.prototype.sanityCheck=function(){},ot.prototype.getPos=function(){return this.p},ot.prototype.getVel=function(){return new x(this.vx,this.vy)},ot.prototype.getAngVel=function(){return this.w},ot.prototype.isSleeping=function(){return null!==this.nodeRoot},ot.prototype.isStatic=function(){return this.nodeIdleTime===1/0},ot.prototype.isRogue=function(){return null===this.space},ot.prototype.setMass=function(t){r(t>0,"Mass must be positive and non-zero."),this.activate(),this.m=t,this.m_inv=1/t},ot.prototype.setMoment=function(t){r(t>0,"Moment of Inertia must be positive and non-zero."),this.activate(),this.i=t,this.i_inv=1/t},ot.prototype.addShape=function(t){this.shapeList.push(t)},ot.prototype.removeShape=function(t){p(this.shapeList,t)};var at=function t(i,e,s){return i===s?i.next(e):(i.a===e?i.next_a=t(i.next_a,e,s):i.next_b=t(i.next_b,e,s),i)};ot.prototype.removeConstraint=function(t){this.constraintList=at(this.constraintList,this,t)},ot.prototype.setPos=function(i){this.activate(),this.sanityCheck(),i===g&&(i=t.v(0,0)),this.p=i},ot.prototype.setVel=function(t){this.activate(),this.vx=t.x,this.vy=t.y},ot.prototype.setAngVel=function(t){this.activate(),this.w=t},ot.prototype.setAngleInternal=function(t){r(!isNaN(t),"Internal Error: Attempting to set body's angle to NaN"),this.a=t,this.rot.x=Math.cos(t),this.rot.y=Math.sin(t)},ot.prototype.setAngle=function(t){this.activate(),this.sanityCheck(),this.setAngleInternal(t)},ot.prototype.velocity_func=function(t,i,e){var s=this.vx*i+(t.x+this.f.x*this.m_inv)*e,n=this.vy*i+(t.y+this.f.y*this.m_inv)*e,r=this.v_limit,o=s*s+n*n,a=o>r*r?r/Math.sqrt(o):1;this.vx=s*a,this.vy=n*a;var h=this.w_limit;this.w=d(this.w*i+this.t*this.i_inv*e,-h,h),this.sanityCheck()},ot.prototype.position_func=function(t){this.p.x+=(this.vx+this.v_biasx)*t,this.p.y+=(this.vy+this.v_biasy)*t,this.setAngleInternal(this.a+(this.w+this.w_bias)*t),this.v_biasx=this.v_biasy=0,this.w_bias=0,this.sanityCheck()},ot.prototype.resetForces=function(){this.activate(),this.f=new x(0,0),this.t=0},ot.prototype.applyForce=function(t,i){this.activate(),this.f=j(this.f,t),this.t+=M(i,t)},ot.prototype.applyImpulse=function(t,i){this.activate(),ci(this,t.x,t.y,i)},ot.prototype.getVelAtPoint=function(t){return j(new x(this.vx,this.vy),k(P(t),this.w))},ot.prototype.getVelAtWorldPoint=function(t){return this.getVelAtPoint(B(t,this.p))},ot.prototype.getVelAtLocalPoint=function(t){return this.getVelAtPoint($(t,this.rot))},ot.prototype.eachShape=function(t){for(var i=0,e=this.shapeList.length;i<e;i++)t(this.shapeList[i])},ot.prototype.eachConstraint=function(t){for(var i=this.constraintList;i;){var e=i.next(this);t(i),i=e}},ot.prototype.eachArbiter=function(t){for(var i=this.arbiterList;i;){var e=i.next(this);i.swappedColl=this===i.body_b,t(i),i=e}},ot.prototype.local2World=function(t){return j(this.p,$(t,this.rot))},ot.prototype.world2Local=function(t){return R(B(t,this.p),this.rot)},ot.prototype.kineticEnergy=function(){var t=this.vx*this.vx+this.vy*this.vy,i=this.w*this.w;return(t?t*this.m:0)+(i?i*this.i:0)};var ht=t.SpatialIndex=function(t){if(this.staticIndex=t,t){if(t.dynamicIndex)throw new Error("This static index is already associated with a dynamic index.");t.dynamicIndex=this}};ht.prototype.collideStatic=function(t,i){if(t.count>0){var e=t.query;this.each(function(t){e.call(t,new z(t.bb_l,t.bb_b,t.bb_r,t.bb_t),i)})}};var ct=t.BBTree=function(t){ht.call(this,t),this.velocityFunc=null,this.leaves={},this.count=0,this.root=null,this.pooledNodes=null,this.pooledPairs=null,this.stamp=0};ct.prototype=Object.create(ht.prototype);var pt=0,ut=function(t,i,s){this.obj=null,this.bb_l=e(i.bb_l,s.bb_l),this.bb_b=e(i.bb_b,s.bb_b),this.bb_r=n(i.bb_r,s.bb_r),this.bb_t=n(i.bb_t,s.bb_t),this.parent=null,this.setA(i),this.setB(s)};ct.prototype.makeNode=function(t,i){var e=this.pooledNodes;return e?(this.pooledNodes=e.parent,e.constructor(this,t,i),e):(pt++,new ut(this,t,i))};var lt=0,yt=function(t,i){this.obj=i,t.getBB(i,this),this.parent=null,this.stamp=1,this.pairs=null,lt++};ct.prototype.getBB=function(t,i){var s=this.velocityFunc;if(s){var r=.1,o=(t.bb_r-t.bb_l)*r,a=(t.bb_t-t.bb_b)*r,h=k(s(t),.1);i.bb_l=t.bb_l+e(-o,h.x),i.bb_b=t.bb_b+e(-a,h.y),i.bb_r=t.bb_r+n(o,h.x),i.bb_t=t.bb_t+n(a,h.y)}else i.bb_l=t.bb_l,i.bb_b=t.bb_b,i.bb_r=t.bb_r,i.bb_t=t.bb_t},ct.prototype.getStamp=function(){var t=this.dynamicIndex;return t&&t.stamp?t.stamp:this.stamp},ct.prototype.incrementStamp=function(){this.dynamicIndex&&this.dynamicIndex.stamp?this.dynamicIndex.stamp++:this.stamp++};var bt=0,ft=function(t,i,e,s){this.prevA=null,this.leafA=t,this.nextA=i,this.prevB=null,this.leafB=e,this.nextB=s};ct.prototype.makePair=function(t,i,e,s){var n=this.pooledPairs;return n?(this.pooledPairs=n.prevA,n.prevA=null,n.leafA=t,n.nextA=i,n.prevB=null,n.leafB=e,n.nextB=s,n):(bt++,new ft(t,i,e,s))},ft.prototype.recycle=function(t){this.prevA=t.pooledPairs,t.pooledPairs=this};var vt=function(t,i,e){e&&(e.leafA===i?e.prevA=t:e.prevB=t),t?t.leafA===i?t.nextA=e:t.nextB=e:i.pairs=e};yt.prototype.clearPairs=function(t){var i,e=this.pairs;for(this.pairs=null;e;)e.leafA===this?(i=e.nextA,vt(e.prevB,e.leafB,e.nextB)):(i=e.nextB,vt(e.prevA,e.leafA,e.nextA)),e.recycle(t),e=i};var dt=function(t,i,e){var s=t.pairs,n=i.pairs,r=e.makePair(t,s,i,n);t.pairs=i.pairs=r,s&&(s.leafA===t?s.prevA=r:s.prevB=r),n&&(n.leafA===i?n.prevA=r:n.prevB=r)};ut.prototype.recycle=function(t){this.parent=t.pooledNodes,t.pooledNodes=this},yt.prototype.recycle=function(t){},ut.prototype.setA=function(t){this.A=t,t.parent=this},ut.prototype.setB=function(t){this.B=t,t.parent=this},yt.prototype.isLeaf=!0,ut.prototype.isLeaf=!1,ut.prototype.otherChild=function(t){return this.A==t?this.B:this.A},ut.prototype.replaceChild=function(t,i,s){o(t==this.A||t==this.B,"Node is not a child of parent."),this.A==t?(this.A.recycle(s),this.setA(i)):(this.B.recycle(s),this.setB(i));for(var r=this;r;r=r.parent){var a=r.A,h=r.B;r.bb_l=e(a.bb_l,h.bb_l),r.bb_b=e(a.bb_b,h.bb_b),r.bb_r=n(a.bb_r,h.bb_r),r.bb_t=n(a.bb_t,h.bb_t)}},ut.prototype.bbArea=yt.prototype.bbArea=function(){return(this.bb_r-this.bb_l)*(this.bb_t-this.bb_b)};var _t=function(t,i){return(n(t.bb_r,i.bb_r)-e(t.bb_l,i.bb_l))*(n(t.bb_t,i.bb_t)-e(t.bb_b,i.bb_b))},xt=function(t,i){return Math.abs(t.bb_l+t.bb_r-i.bb_l-i.bb_r)+Math.abs(t.bb_b+t.bb_t-i.bb_b-i.bb_t)},gt=function t(i,s,r){if(null==i)return s;if(i.isLeaf)return r.makeNode(s,i);var o=i.B.bbArea()+_t(i.A,s),a=i.A.bbArea()+_t(i.B,s);return o===a&&(o=xt(i.A,s),a=xt(i.B,s)),a<o?i.setB(t(i.B,s,r)):i.setA(t(i.A,s,r)),i.bb_l=e(i.bb_l,s.bb_l),i.bb_b=e(i.bb_b,s.bb_b),i.bb_r=n(i.bb_r,s.bb_r),i.bb_t=n(i.bb_t,s.bb_t),i};ut.prototype.intersectsBB=yt.prototype.intersectsBB=function(t){return this.bb_l<=t.r&&t.l<=this.bb_r&&this.bb_b<=t.t&&t.b<=this.bb_t};var mt=function t(i,e,s){i.intersectsBB(e)&&(i.isLeaf?s(i.obj):(t(i.A,e,s),t(i.B,e,s)))},wt=function(t,i,s){var r=1/(s.x-i.x),o=t.bb_l==i.x?-(1/0):(t.bb_l-i.x)*r,a=t.bb_r==i.x?1/0:(t.bb_r-i.x)*r,h=e(o,a),c=n(o,a),p=1/(s.y-i.y),u=t.bb_b==i.y?-(1/0):(t.bb_b-i.y)*p,l=t.bb_t==i.y?1/0:(t.bb_t-i.y)*p,y=e(u,l),b=n(u,l);if(y<=c&&h<=b){var f=n(h,y),v=e(c,b);if(0<=v&&f<=1)return n(f,0)}return 1/0},St=function t(i,s,n,r,o){if(i.isLeaf)return o(i.obj);var a=wt(i.A,s,n),h=wt(i.B,s,n);return a<h?(a<r&&(r=e(r,t(i.A,s,n,r,o))),h<r&&(r=e(r,t(i.B,s,n,r,o)))):(h<r&&(r=e(r,t(i.B,s,n,r,o))),a<r&&(r=e(r,t(i.A,s,n,r,o)))),r};ct.prototype.subtreeRecycle=function(t){t.isLeaf&&(this.subtreeRecycle(t.A),this.subtreeRecycle(t.B),t.recycle(this))};var At=function(t,i,e){if(i==t)return null;var s=i.parent;if(s==t){var n=t.otherChild(i);return n.parent=t.parent,t.recycle(e),n}return s.parent.replaceChild(s,s.otherChild(i),e),t},jt=function(t,i){return t.bb_l<=i.bb_r&&i.bb_l<=t.bb_r&&t.bb_b<=i.bb_t&&i.bb_b<=t.bb_t};yt.prototype.markLeafQuery=function(t,i,e,s){jt(t,this)&&(i?dt(t,this,e):(this.stamp<t.stamp&&dt(this,t,e),s&&s(t.obj,this.obj)))},ut.prototype.markLeafQuery=function(t,i,e,s){jt(t,this)&&(this.A.markLeafQuery(t,i,e,s),this.B.markLeafQuery(t,i,e,s))},yt.prototype.markSubtree=function(t,i,e){if(this.stamp==t.getStamp()){i&&i.markLeafQuery(this,!1,t,e);for(var s=this;s.parent;s=s.parent)s==s.parent.A?s.parent.B.markLeafQuery(this,!0,t,e):s.parent.A.markLeafQuery(this,!1,t,e)}else for(var n=this.pairs;n;)this===n.leafB?(e&&e(n.leafA.obj,this.obj),n=n.nextB):n=n.nextA},ut.prototype.markSubtree=function(t,i,e){this.A.markSubtree(t,i,e),this.B.markSubtree(t,i,e)},yt.prototype.containsObj=function(t){return this.bb_l<=t.bb_l&&this.bb_r>=t.bb_r&&this.bb_b<=t.bb_b&&this.bb_t>=t.bb_t},yt.prototype.update=function(t){var i=t.root,e=this.obj;return!this.containsObj(e)&&(t.getBB(this.obj,this),i=At(i,this,t),t.root=gt(i,this,t),this.clearPairs(t),this.stamp=t.getStamp(),!0)},yt.prototype.addPairs=function(t){var i=t.dynamicIndex;if(i){var e=i.root;e&&e.markLeafQuery(this,!0,i,null)}else{var s=t.staticIndex.root;this.markSubtree(t,s,null)}},ct.prototype.insert=function(t,i){var e=new yt(this,t);this.leaves[i]=e,this.root=gt(this.root,e,this),this.count++,e.stamp=this.getStamp(),e.addPairs(this),this.incrementStamp()},ct.prototype.remove=function(t,i){var e=this.leaves[i];delete this.leaves[i],this.root=At(this.root,e,this),this.count--,e.clearPairs(this),e.recycle(this)},ct.prototype.contains=function(t,i){return null!=this.leaves[i]};var Bt=function(t,i){};ct.prototype.reindexQuery=function(t){if(this.root){var i,e=this.leaves;for(i in e)e[i].update(this);var s=this.staticIndex,n=s&&s.root;this.root.markSubtree(this,n,t),s&&!n&&this.collideStatic(this,s,t),this.incrementStamp()}},ct.prototype.reindex=function(){this.reindexQuery(Bt)},ct.prototype.reindexObject=function(t,i){var e=this.leaves[i];e&&(e.update(this)&&e.addPairs(this),this.incrementStamp())},ct.prototype.pointQuery=function(t,i){this.query(new z(t.x,t.y,t.x,t.y),i)},ct.prototype.segmentQuery=function(t,i,e,s){this&&this.root&&St(this.root,t,i,e,s)},ct.prototype.query=function(t,i){this.root&&mt(this.root,t,i)},ct.prototype.count=function(){return this.count},ct.prototype.each=function(t){var i;for(i in this.leaves)t(this.leaves[i].obj)};var Ct=function(t,i,s,r,o){return(n(t.bb_r,r)-e(t.bb_l,i))*(n(t.bb_t,o)-e(t.bb_b,s))},kt=function t(i,s,r,o){if(1==o)return s[r];if(2==o)return i.makeNode(s[r],s[r+1]);for(var a=s[r],h=a.bb_l,c=a.bb_b,p=a.bb_r,u=a.bb_t,l=r+o,y=r+1;y<l;y++)a=s[y],h=e(h,a.bb_l),c=e(c,a.bb_b),p=n(p,a.bb_r),u=n(u,a.bb_t);var b=p-h>u-c,f=new Array(2*o);if(b)for(var y=r;y<l;y++)f[2*y+0]=s[y].bb_l,f[2*y+1]=s[y].bb_r;else for(var y=r;y<l;y++)f[2*y+0]=s[y].bb_b,f[2*y+1]=s[y].bb_t;f.sort(function(t,i){return t-i});var v=.5*(f[o-1]+f[o]),d=h,_=c,x=p,g=u,m=h,w=c,S=p,A=u;b?x=m=v:g=w=v;for(var j=l,B=r;B<j;){var a=s[B];Ct(a,m,w,S,A)<Ct(a,d,_,x,g)?(j--,s[B]=s[j],s[j]=a):B++}if(j==o){for(var a=null,y=r;y<l;y++)a=gt(a,s[y],i);return a}return NodeNew(i,t(i,s,r,j-r),t(i,s,j,l-j))};ct.prototype.optimize=function(){var t=new Array(this.count),i=0;for(var e in this.leaves)t[i++]=this.nodes[e];tree.subtreeRecycle(root),this.root=kt(tree,t,t.length)};var Mt=function t(i,e){!i.isLeaf&&e<=10&&(t(i.A,e+1),t(i.B,e+1));for(var s="",n=0;n<e;n++)s+=" ";console.log(s+i.bb_b+" "+i.bb_t)};ct.prototype.log=function(){this.root&&Mt(this.root,0)};var It=t.CollisionHandler=function(){this.a=this.b=0};It.prototype.begin=function(t,i){return!0},It.prototype.preSolve=function(t,i){return!0},It.prototype.postSolve=function(t,i){},It.prototype.separate=function(t,i){};var Pt=function(t,i){this.e=0,this.u=0,this.surface_vr=g,this.a=t,this.body_a=t.body,this.b=i,this.body_b=i.body,this.thread_a_next=this.thread_a_prev=null,this.thread_b_next=this.thread_b_prev=null,this.contacts=null,this.stamp=0,this.handler=null,this.swappedColl=!1,this.state="first coll"};Pt.prototype.getShapes=function(){return this.swappedColl?[this.b,this.a]:[this.a,this.b]},Pt.prototype.totalImpulse=function(){for(var t=this.contacts,i=new x(0,0),e=0,s=t.length;e<s;e++){var n=t[e];i.add(k(n.n,n.jnAcc))}return this.swappedColl?i:i.neg()},Pt.prototype.totalImpulseWithFriction=function(){for(var t=this.contacts,i=new x(0,0),e=0,s=t.length;e<s;e++){var n=t[e];i.add(new x(n.jnAcc,n.jtAcc).rotate(n.n))}return this.swappedColl?i:i.neg()},Pt.prototype.totalKE=function(){for(var t=(1-this.e)/(1+this.e),i=0,e=this.contacts,s=0,n=e.length;s<n;s++){var r=e[s],o=r.jnAcc,a=r.jtAcc;i+=t*o*o/r.nMass+a*a/r.tMass}return i},Pt.prototype.ignore=function(){this.state="ignore"},Pt.prototype.getA=function(){return this.swappedColl?this.b:this.a},Pt.prototype.getB=function(){return this.swappedColl?this.a:this.b},Pt.prototype.isFirstContact=function(){return"first coll"===this.state};var Lt=function(t,i,e){this.point=t,this.normal=i,this.dist=e};Pt.prototype.getContactPointSet=function(){var t,i=new Array(this.contacts.length);for(t=0;t<i.length;t++)i[t]=new Lt(this.contacts[t].p,this.contacts[t].n,this.contacts[t].dist);return i},Pt.prototype.getNormal=function(t){var i=this.contacts[t].n;return this.swappedColl?C(i):i},Pt.prototype.getPoint=function(t){return this.contacts[t].p},Pt.prototype.getDepth=function(t){return this.contacts[t].dist};var $t=function(t,i,e,s){e?e.body_a===i?e.thread_a_next=s:e.thread_b_next=s:i.arbiterList===t&&(i.arbiterList=s),s&&(s.body_a===i?s.thread_a_prev=e:s.thread_b_prev=e)};Pt.prototype.unthread=function(){$t(this,this.body_a,this.thread_a_prev,this.thread_a_next),$t(this,this.body_b,this.thread_b_prev,this.thread_b_next),this.thread_a_prev=this.thread_a_next=null,this.thread_b_prev=this.thread_b_next=null},Pt.prototype.update=function(t,i,e,s){if(this.contacts)for(var n=0;n<this.contacts.length;n++)for(var r=this.contacts[n],o=0;o<t.length;o++){var a=t[o];a.hash===r.hash&&(a.jnAcc=r.jnAcc,a.jtAcc=r.jtAcc)}this.contacts=t,this.handler=i,this.swappedColl=e.collision_type!==i.a,this.e=e.e*s.e,this.u=e.u*s.u,this.surface_vr=B(e.surface_v,s.surface_v),this.a=e,this.body_a=e.body,this.b=s,this.body_b=s.body,"cached"==this.state&&(this.state="first coll")},Pt.prototype.preStep=function(t,i,s){for(var n=this.body_a,r=this.body_b,o=0;o<this.contacts.length;o++){var a=this.contacts[o];a.r1=B(a.p,n.p),a.r2=B(a.p,r.p),a.nMass=1/yi(n,r,a.r1,a.r2,a.n),a.tMass=1/yi(n,r,a.r1,a.r2,P(a.n)),a.bias=-s*e(0,a.dist+i)/t,a.jBias=0,a.bounce=hi(n,r,a.r1,a.r2,a.n)*this.e}},Pt.prototype.applyCachedImpulse=function(t){if(!this.isFirstContact())for(var i=this.body_a,e=this.body_b,s=0;s<this.contacts.length;s++){var n=this.contacts[s],r=n.n.x,o=n.n.y,a=r*n.jnAcc-o*n.jtAcc,h=r*n.jtAcc+o*n.jnAcc;pi(i,e,n.r1,n.r2,a*t,h*t)}};var Rt=0,Ft=0;Pt.prototype.applyImpulse=function(){Rt++;for(var t=this.body_a,i=this.body_b,e=this.surface_vr,s=this.u,r=0;r<this.contacts.length;r++){Ft++;var o=this.contacts[r],a=o.nMass,h=o.n,c=o.r1,p=o.r2,u=i.vx-p.y*i.w-(t.vx-c.y*t.w),l=i.vy+p.x*i.w-(t.vy+c.x*t.w),y=h.x*(i.v_biasx-p.y*i.w_bias-t.v_biasx+c.y*t.w_bias)+h.y*(p.x*i.w_bias+i.v_biasy-c.x*t.w_bias-t.v_biasy),b=w(u,l,h.x,h.y),f=w(u+e.x,l+e.y,-h.y,h.x),v=(o.bias-y)*a,_=o.jBias;o.jBias=n(_+v,0);var x=-(o.bounce+b)*a,g=o.jnAcc;o.jnAcc=n(g+x,0);var m=s*o.jnAcc,S=-f*o.tMass,A=o.jtAcc;o.jtAcc=d(A+S,-m,m);var j=h.x*(o.jBias-_),B=h.y*(o.jBias-_);ui(t,-j,-B,c),ui(i,j,B,p);var C=o.jnAcc-g,k=o.jtAcc-A;pi(t,i,c,p,h.x*C-h.y*k,h.x*k+h.y*C)}},Pt.prototype.callSeparate=function(t){var i=t.lookupHandler(this.a.collision_type,this.b.collision_type);i.separate(this,t)},Pt.prototype.next=function(t){return this.body_a==t?this.thread_a_next:this.thread_b_next};var Vt=0,Nt=function(t,i,e,s){this.p=t,this.n=i,this.dist=e,this.r1=this.r2=g,this.nMass=this.tMass=this.bounce=this.bias=0,this.jnAcc=this.jtAcc=this.jBias=0,this.hash=s,Vt++},Tt=[],Qt=function(t,i,e,s){var n=e+s,r=B(i,t),o=F(r);if(!(o>=n*n)){var a=Math.sqrt(o);return new Nt(j(t,k(r,.5+(e-.5*n)/(a?a:1/0))),a?k(r,1/a):new x(1,0),a-n,0)}},Ot=function(t,i){var e=Qt(t.tc,i.tc,t.r,i.r);return e?[e]:Tt},qt=function(t,i){var e=i.ta,s=i.tb,n=t.tc,r=B(s,e),o=_(m(r,B(n,e))/F(r)),a=j(e,k(r,o)),h=Qt(n,a,t.r,i.r);if(h){var c=h.n;return 0===o&&m(c,i.a_tangent)<0||1===o&&m(c,i.b_tangent)<0?Tt:[h]}return Tt},Et=0,Ht=function(t,i){var e=0,s=t.valueOnAxis(i[0].n,i[0].d);if(s>0)return-1;for(var n=1;n<i.length;n++){var r=t.valueOnAxis(i[n].n,i[n].d);if(r>0)return-1;r>s&&(s=r,e=n)}return Et=s,e},Dt=function(t,i,e,s){for(var n=[],r=t.tVerts,o=0;o<r.length;o+=2){var a=r[o],h=r[o+1];i.containsVertPartial(a,h,C(e))&&n.push(new Nt(new x(a,h),e,s,c(t.hashid,o)))}for(var p=i.tVerts,o=0;o<p.length;o+=2){var a=p[o],h=p[o+1];t.containsVertPartial(a,h,e)&&n.push(new Nt(new x(a,h),e,s,c(i.hashid,o)))}return n},zt=function(t,i,e,s){for(var n=[],r=t.tVerts,o=0;o<r.length;o+=2){var a=r[o],h=r[o+1];i.containsVert(a,h)&&n.push(new Nt(new x(a,h),e,s,c(t.hashid,o>>1)))}for(var p=i.tVerts,o=0;o<p.length;o+=2){var a=p[o],h=p[o+1];t.containsVert(a,h)&&n.push(new Nt(new x(a,h),e,s,c(i.hashid,o>>1)))}return n.length?n:Dt(t,i,e,s)},Gt=function(t,i){var e=Ht(i,t.tPlanes);if(e==-1)return Tt;var s=Et,n=Ht(t,i.tPlanes);if(n==-1)return Tt;var r=Et;return s>r?zt(t,i,t.tPlanes[e].n,s):zt(t,i,C(i.tPlanes[n].n),r)},Wt=function(t,i,s){var n=m(i,t.ta)-t.r,r=m(i,t.tb)-t.r;return e(n,r)-s},Jt=function(t,i,e,s,n){for(var r=M(i.tn,i.ta),o=M(i.tn,i.tb),a=k(i.tn,n),h=e.tVerts,p=0;p<h.length;p+=2){var u=h[p],l=h[p+1];if(w(u,l,a.x,a.y)<m(i.tn,i.ta)*n+i.r){var y=I(i.tn.x,i.tn.y,u,l);r>=y&&y>=o&&t.push(new Nt(new x(u,l),a,s,c(e.hashid,p)))}}},Yt=function(t,i){var e=[],s=i.tPlanes,n=s.length,r=m(t.tn,t.ta),o=i.valueOnAxis(t.tn,r)-t.r,a=i.valueOnAxis(C(t.tn),-r)-t.r;if(a>0||o>0)return Tt;var h=0,p=Wt(t,s[0].n,s[0].d);if(p>0)return Tt;for(var u=0;u<n;u++){var l=Wt(t,s[u].n,s[u].d);if(l>0)return Tt;l>p&&(p=l,h=u)}var y=C(s[h].n),b=j(t.ta,k(y,t.r)),f=j(t.tb,k(y,t.r));if(i.containsVert(b.x,b.y)&&e.push(new Nt(b,y,p,c(t.hashid,0))),i.containsVert(f.x,f.y)&&e.push(new Nt(f,y,p,c(t.hashid,1))),
(o>=p||a>=p)&&(o>a?Jt(e,t,i,o,1):Jt(e,t,i,a,-1)),0===e.length){var v,d=2*h,_=i.tVerts,g=new x(_[d],_[d+1]);if(v=Qt(t.ta,g,t.r,0,e))return[v];if(v=Qt(t.tb,g,t.r,0,e))return[v];var w=2*n,S=new x(_[(d+2)%w],_[(d+3)%w]);if(v=Qt(t.ta,S,t.r,0,e))return[v];if(v=Qt(t.tb,S,t.r,0,e))return[v]}return e},Ut=function(t,i){for(var e=i.tPlanes,s=0,n=m(e[0].n,t.tc)-e[0].d-t.r,r=0;r<e.length;r++){var o=m(e[r].n,t.tc)-e[r].d-t.r;if(o>0)return Tt;o>n&&(n=o,s=r)}var a=e[s].n,h=i.tVerts,c=h.length,p=s<<1,u=h[p],l=h[p+1],y=h[(p+2)%c],b=h[(p+3)%c],f=I(a.x,a.y,u,l),v=I(a.x,a.y,y,b),d=M(a,t.tc);if(d<v){var _=Qt(t.tc,new x(y,b),t.r,0,_);return _?[_]:Tt}if(d<f)return[new Nt(B(t.tc,k(a,t.r+n/2)),C(a),n,0)];var _=Qt(t.tc,new x(u,l),t.r,0,_);return _?[_]:Tt};Z.prototype.collisionCode=0,it.prototype.collisionCode=1,st.prototype.collisionCode=2,Z.prototype.collisionTable=[Ot,qt,Ut],it.prototype.collisionTable=[null,function(t,i){return Tt},Yt],st.prototype.collisionTable=[null,null,Gt];var Kt=t.collideShapes=function(t,i){return r(t.collisionCode<=i.collisionCode,"Collided shapes must be sorted by type"),t.collisionTable[i.collisionCode](t,i)},Xt=new It,Zt=t.Space=function(){this.stamp=0,this.curr_dt=0,this.bodies=[],this.rousedBodies=[],this.sleepingComponents=[],this.staticShapes=new ct(null),this.activeShapes=new ct(this.staticShapes),this.arbiters=[],this.contactBuffersHead=null,this.cachedArbiters={},this.constraints=[],this.locked=0,this.collisionHandlers={},this.defaultHandler=Xt,this.postStepCallbacks=[],this.iterations=10,this.gravity=g,this.damping=1,this.idleSpeedThreshold=0,this.sleepTimeThreshold=1/0,this.collisionSlop=.1,this.collisionBias=Math.pow(.9,60),this.collisionPersistence=3,this.enableContactGraph=!1,this.staticBody=new ot(1/0,1/0),this.staticBody.nodeIdleTime=1/0,this.collideShapes=this.makeCollideShapes()};Zt.prototype.getCurrentTimeStep=function(){return this.curr_dt},Zt.prototype.setIterations=function(t){this.iterations=t},Zt.prototype.isLocked=function(){return this.locked};var ti=function(t){r(!t.locked,"This addition/removal cannot be done safely during a call to cpSpaceStep() \t or during a query. Put these calls into a post-step callback.")};Zt.prototype.addCollisionHandler=function(t,i,e,s,n,r){ti(this),this.removeCollisionHandler(t,i);var o=new It;o.a=t,o.b=i,e&&(o.begin=e),s&&(o.preSolve=s),n&&(o.postSolve=n),r&&(o.separate=r),this.collisionHandlers[c(t,i)]=o},Zt.prototype.removeCollisionHandler=function(t,i){ti(this),delete this.collisionHandlers[c(t,i)]},Zt.prototype.setDefaultCollisionHandler=function(t,i,e,s){ti(this);var n=new It;t&&(n.begin=t),i&&(n.preSolve=i),e&&(n.postSolve=e),s&&(n.separate=s),this.defaultHandler=n},Zt.prototype.lookupHandler=function(t,i){return this.collisionHandlers[c(t,i)]||this.defaultHandler},Zt.prototype.addShape=function(t){var i=t.body;return i.isStatic()?this.addStaticShape(t):(r(!t.space,"This shape is already added to a space and cannot be added to another."),ti(this),i.activate(),i.addShape(t),t.update(i.p,i.rot),this.activeShapes.insert(t,t.hashid),t.space=this,t)},Zt.prototype.addStaticShape=function(t){r(!t.space,"This shape is already added to a space and cannot be added to another."),ti(this);var i=t.body;return i.addShape(t),t.update(i.p,i.rot),this.staticShapes.insert(t,t.hashid),t.space=this,t},Zt.prototype.addBody=function(t){return r(!t.isStatic(),"Static bodies cannot be added to a space as they are not meant to be simulated."),r(!t.space,"This body is already added to a space and cannot be added to another."),ti(this),this.bodies.push(t),t.space=this,t},Zt.prototype.addConstraint=function(t){r(!t.space,"This shape is already added to a space and cannot be added to another."),ti(this);var i=t.a,e=t.b;return i.activate(),e.activate(),this.constraints.push(t),t.next_a=i.constraintList,i.constraintList=t,t.next_b=e.constraintList,e.constraintList=t,t.space=this,t},Zt.prototype.filterArbiters=function(t,i){for(var e in this.cachedArbiters){var s=this.cachedArbiters[e];(t!==s.body_a||i!==s.a&&null!==i)&&(t!==s.body_b||i!==s.b&&null!==i)||(i&&"cached"!==s.state&&s.callSeparate(this),s.unthread(),p(this.arbiters,s),delete this.cachedArbiters[e])}},Zt.prototype.removeShape=function(t){var i=t.body;i.isStatic()?this.removeStaticShape(t):(r(this.containsShape(t),"Cannot remove a shape that was not added to the space. (Removed twice maybe?)"),ti(this),i.activate(),i.removeShape(t),this.filterArbiters(i,t),this.activeShapes.remove(t,t.hashid),t.space=null)},Zt.prototype.removeStaticShape=function(t){r(this.containsShape(t),"Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)"),ti(this);var i=t.body;i.isStatic()&&i.activateStatic(t),i.removeShape(t),this.filterArbiters(i,t),this.staticShapes.remove(t,t.hashid),t.space=null},Zt.prototype.removeBody=function(t){r(this.containsBody(t),"Cannot remove a body that was not added to the space. (Removed twice maybe?)"),ti(this),t.activate(),p(this.bodies,t),t.space=null},Zt.prototype.removeConstraint=function(t){r(this.containsConstraint(t),"Cannot remove a constraint that was not added to the space. (Removed twice maybe?)"),ti(this),t.a.activate(),t.b.activate(),p(this.constraints,t),t.a.removeConstraint(t),t.b.removeConstraint(t),t.space=null},Zt.prototype.containsShape=function(t){return t.space===this},Zt.prototype.containsBody=function(t){return t.space==this},Zt.prototype.containsConstraint=function(t){return t.space==this},Zt.prototype.uncacheArbiter=function(t){delete this.cachedArbiters[c(t.a.hashid,t.b.hashid)],p(this.arbiters,t)},Zt.prototype.eachBody=function(t){this.lock();for(var i=this.bodies,e=0;e<i.length;e++)t(i[e]);for(var s=this.sleepingComponents,e=0;e<s.length;e++)for(var n=s[e],r=n;r;){var o=r.nodeNext;t(r),r=o}this.unlock(!0)},Zt.prototype.eachShape=function(t){this.lock(),this.activeShapes.each(t),this.staticShapes.each(t),this.unlock(!0)},Zt.prototype.eachConstraint=function(t){this.lock();for(var i=this.constraints,e=0;e<i.length;e++)t(i[e]);this.unlock(!0)},Zt.prototype.reindexStatic=function(){r(!this.locked,"You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete."),this.staticShapes.each(function(t){var i=t.body;t.update(i.p,i.rot)}),this.staticShapes.reindex()},Zt.prototype.reindexShape=function(t){r(!this.locked,"You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");var i=t.body;t.update(i.p,i.rot),this.activeShapes.reindexObject(t,t.hashid),this.staticShapes.reindexObject(t,t.hashid)},Zt.prototype.reindexShapesForBody=function(t){for(var i=t.shapeList;i;i=i.next)this.reindexShape(i)},Zt.prototype.useSpatialHash=function(t,i){throw new Error("Spatial Hash not implemented.")},Zt.prototype.activateBody=function(t){if(r(!t.isRogue(),"Internal error: Attempting to activate a rogue body."),this.locked)this.rousedBodies.indexOf(t)===-1&&this.rousedBodies.push(t);else{this.bodies.push(t);for(var i=0;i<t.shapeList.length;i++){var e=t.shapeList[i];this.staticShapes.remove(e,e.hashid),this.activeShapes.insert(e,e.hashid)}for(var s=t.arbiterList;s;s=s.next(t)){var n=s.body_a;if(t===n||n.isStatic()){var o=s.a,a=s.b;this.cachedArbiters[c(o.hashid,a.hashid)]=s,s.stamp=this.stamp,s.handler=this.lookupHandler(o.collision_type,a.collision_type),this.arbiters.push(s)}}for(var h=t.constraintList;h;h=h.nodeNext){var n=h.a;(t===n||n.isStatic())&&this.constraints.push(h)}}},Zt.prototype.deactivateBody=function(t){r(!t.isRogue(),"Internal error: Attempting to deactivate a rogue body."),p(this.bodies,t);for(var i=0;i<t.shapeList.length;i++){var e=t.shapeList[i];this.activeShapes.remove(e,e.hashid),this.staticShapes.insert(e,e.hashid)}for(var s=t.arbiterList;s;s=s.next(t)){var n=s.body_a;(t===n||n.isStatic())&&this.uncacheArbiter(s)}for(var o=t.constraintList;o;o=o.nodeNext){var n=o.a;(t===n||n.isStatic())&&p(this.constraints,o)}};var ii=function(t){return t?t.nodeRoot:null},ei=function(t){if(t&&t.isSleeping(t)){r(!t.isRogue(),"Internal Error: componentActivate() called on a rogue body.");for(var i=t.space,e=t;e;){var s=e.nodeNext;e.nodeIdleTime=0,e.nodeRoot=null,e.nodeNext=null,i.activateBody(e),e=s}p(i.sleepingComponents,t)}};ot.prototype.activate=function(){this.isRogue()||(this.nodeIdleTime=0,ei(ii(this)))},ot.prototype.activateStatic=function(t){r(this.isStatic(),"Body.activateStatic() called on a non-static body.");for(var i=this.arbiterList;i;i=i.next(this))t&&t!=i.a&&t!=i.b||(i.body_a==this?i.body_b:i.body_a).activate()},ot.prototype.pushArbiter=function(t){o(null===(t.body_a===this?t.thread_a_next:t.thread_b_next),"Internal Error: Dangling contact graph pointers detected. (A)"),o(null===(t.body_a===this?t.thread_a_prev:t.thread_b_prev),"Internal Error: Dangling contact graph pointers detected. (B)");var i=this.arbiterList;o(null===i||null===(i.body_a===this?i.thread_a_prev:i.thread_b_prev),"Internal Error: Dangling contact graph pointers detected. (C)"),t.body_a===this?t.thread_a_next=i:t.thread_b_next=i,i&&(i.body_a===this?i.thread_a_prev=t:i.thread_b_prev=t),this.arbiterList=t};var si=function(t,i){i.nodeRoot=t,i!==t&&(i.nodeNext=t.nodeNext,t.nodeNext=i)},ni=function t(i,e){if(!e.isRogue()){var s=ii(e);if(null==s){si(i,e);for(var n=e.arbiterList;n;n=n.next(e))t(i,e==n.body_a?n.body_b:n.body_a);for(var r=e.constraintList;r;r=r.next(e))t(i,e==r.a?r.b:r.a)}else o(s===i,"Internal Error: Inconsistency detected in the contact graph.")}},ri=function(t,i){for(var e=t;e;e=e.nodeNext)if(e.nodeIdleTime<i)return!0;return!1};Zt.prototype.processComponents=function(t){for(var i=this.sleepTimeThreshold!==1/0,e=this.bodies,s=0;s<e.length;s++){var n=e[s];o(null===n.nodeNext,"Internal Error: Dangling next pointer detected in contact graph."),o(null===n.nodeRoot,"Internal Error: Dangling root pointer detected in contact graph.")}if(i)for(var r=this.idleSpeedThreshold,a=r?r*r:F(this.gravity)*t*t,s=0;s<e.length;s++){var n=e[s],h=a?n.m*a:0;n.nodeIdleTime=n.kineticEnergy()>h?0:n.nodeIdleTime+t}for(var c=this.arbiters,s=0,p=c.length;s<p;s++){var u=c[s],l=u.body_a,y=u.body_b;i&&((y.isRogue()&&!y.isStatic()||l.isSleeping())&&l.activate(),(l.isRogue()&&!l.isStatic()||y.isSleeping())&&y.activate()),l.pushArbiter(u),y.pushArbiter(u)}if(i){for(var b=this.constraints,s=0;s<b.length;s++){var f=b[s],l=f.a,y=f.b;y.isRogue()&&!y.isStatic()&&l.activate(),l.isRogue()&&!l.isStatic()&&y.activate()}for(var s=0;s<e.length;){var n=e[s];if(null!==ii(n)||(ni(n,n),ri(n,this.sleepTimeThreshold)))s++,n.nodeRoot=null,n.nodeNext=null;else{this.sleepingComponents.push(n);for(var v=n;v;v=v.nodeNext)this.deactivateBody(v)}}}},ot.prototype.sleep=function(){this.sleepWithGroup(null)},ot.prototype.sleepWithGroup=function(t){r(!this.isStatic()&&!this.isRogue(),"Rogue and static bodies cannot be put to sleep.");var i=this.space;if(r(i,"Cannot put a rogue body to sleep."),r(!i.locked,"Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback."),r(null===t||t.isSleeping(),"Cannot use a non-sleeping body as a group identifier."),this.isSleeping())return void r(ii(this)===ii(t),"The body is already sleeping and it's group cannot be reassigned.");for(var e=0;e<this.shapeList.length;e++)this.shapeList[e].update(this.p,this.rot);if(i.deactivateBody(this),t){var s=ii(t);this.nodeRoot=s,this.nodeNext=s.nodeNext,this.nodeIdleTime=0,s.nodeNext=this}else this.nodeRoot=this,this.nodeNext=null,this.nodeIdleTime=0,i.sleepingComponents.push(this);p(i.bodies,this)},Zt.prototype.activateShapesTouchingShape=function(t){this.sleepTimeThreshold!==1/0&&this.shapeQuery(t,function(t,i){t.body.activate()})},Zt.prototype.pointQuery=function(t,i,e,s){var n=function(n){(!n.group||e!==n.group)&&i&n.layers&&n.pointQuery(t)&&s(n)},r=new z(t.x,t.y,t.x,t.y);this.lock(),this.activeShapes.query(r,n),this.staticShapes.query(r,n),this.unlock(!0)},Zt.prototype.pointQueryFirst=function(t,i,e){var s=null;return this.pointQuery(t,i,e,function(t){t.sensor||(s=t)}),s},Zt.prototype.nearestPointQuery=function(t,i,e,s,n){var r=function(r){if((!r.group||s!==r.group)&&e&r.layers){var o=r.nearestPointQuery(t);o.d<i&&n(r,o.d,o.p)}},o=G(t,i);this.lock(),this.activeShapes.query(o,r),this.staticShapes.query(o,r),this.unlock(!0)},Zt.prototype.nearestPointQueryNearest=function(t,i,e,s){var n,r=function(r){if((!r.group||s!==r.group)&&e&r.layers&&!r.sensor){var o=r.nearestPointQuery(t);o.d<i&&(!n||o.d<n.d)&&(n=o)}},o=G(t,i);return this.activeShapes.query(o,r),this.staticShapes.query(o,r),n},Zt.prototype.segmentQuery=function(t,i,e,s,n){var r=function(r){var o;return(!r.group||s!==r.group)&&e&r.layers&&(o=r.segmentQuery(t,i))&&n(r,o.t,o.n),1};this.lock(),this.staticShapes.segmentQuery(t,i,1,r),this.activeShapes.segmentQuery(t,i,1,r),this.unlock(!0)},Zt.prototype.segmentQueryFirst=function(t,i,e,s){var n=null,r=function(r){var o;return(!r.group||s!==r.group)&&e&r.layers&&!r.sensor&&(o=r.segmentQuery(t,i))&&(null===n||o.t<n.t)&&(n=o),n?n.t:1};return this.staticShapes.segmentQuery(t,i,1,r),this.activeShapes.segmentQuery(t,i,n?n.t:1,r),n},Zt.prototype.bbQuery=function(t,i,e,s){var n=function(n){(!n.group||e!==n.group)&&i&n.layers&&W(t,n.bb_l,n.bb_b,n.bb_r,n.bb_t)&&s(n)};this.lock(),this.activeShapes.query(t,n),this.staticShapes.query(t,n),this.unlock(!0)},Zt.prototype.shapeQuery=function(t,i){var e=t.body;e&&t.update(e.p,e.rot);var s=new z(t.bb_l,t.bb_b,t.bb_r,t.bb_t),n=!1,r=function(e){var s=t;if((!s.group||s.group!==e.group)&&s.layers&e.layers&&s!==e){var r;if(s.collisionCode<=e.collisionCode)r=Kt(s,e);else{r=Kt(e,s);for(var o=0;o<r.length;o++)r[o].n=C(r[o].n)}if(r.length&&(n=!(s.sensor||e.sensor),i)){for(var a=new Array(r.length),o=0;o<r.length;o++)a[o]=new Lt(r[o].p,r[o].n,r[o].dist);i(e,a)}}};return this.lock(),this.activeShapes.query(s,r),this.staticShapes.query(s,r),this.unlock(!0),n},Zt.prototype.addPostStepCallback=function(t){o(this.locked,"Adding a post-step callback when the space is not locked is unnecessary. Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query."),this.postStepCallbacks.push(t)},Zt.prototype.runPostStepCallbacks=function(){for(var t=0;t<this.postStepCallbacks.length;t++)this.postStepCallbacks[t]();this.postStepCallbacks=[]},Zt.prototype.lock=function(){this.locked++},Zt.prototype.unlock=function(t){if(this.locked--,r(this.locked>=0,"Internal Error: Space lock underflow."),0===this.locked&&t){for(var i=this.rousedBodies,e=0;e<i.length;e++)this.activateBody(i[e]);i.length=0,this.runPostStepCallbacks()}},Zt.prototype.makeCollideShapes=function(){var t=this;return function(i,e){var s=t;if(i.bb_l<=e.bb_r&&e.bb_l<=i.bb_r&&i.bb_b<=e.bb_t&&e.bb_b<=i.bb_t&&i.body!==e.body&&(!i.group||i.group!==e.group)&&i.layers&e.layers){var n=s.lookupHandler(i.collision_type,e.collision_type),r=i.sensor||e.sensor;if(!r||n!==Xt){if(i.collisionCode>e.collisionCode){var o=i;i=e,e=o}var a=Kt(i,e);if(0!==a.length){var h=c(i.hashid,e.hashid),p=s.cachedArbiters[h];p||(p=s.cachedArbiters[h]=new Pt(i,e)),p.update(a,n,i,e),"first coll"!=p.state||n.begin(p,s)||p.ignore(),"ignore"!==p.state&&n.preSolve(p,s)&&!r?s.arbiters.push(p):(p.contacts=null,"ignore"!==p.state&&(p.state="normal")),p.stamp=s.stamp}}}}},Zt.prototype.arbiterSetFilter=function(t){var i=this.stamp-t.stamp,e=t.body_a,s=t.body_b;return!(!e.isStatic()&&!e.isSleeping()||!s.isStatic()&&!s.isSleeping())||(i>=1&&"cached"!=t.state&&(t.callSeparate(this),t.state="cached"),!(i>=this.collisionPersistence)||(t.contacts=null,!1))};var oi=function(t){var i=t.body;t.update(i.p,i.rot)};Zt.prototype.step=function(t){if(0!==t){r(0===g.x&&0===g.y,"vzero is invalid"),this.stamp++;var i=this.curr_dt;this.curr_dt=t;var e,s,n,o=this.bodies,a=this.constraints,h=this.arbiters;for(e=0;e<h.length;e++){var c=h[e];c.state="normal",c.body_a.isSleeping()||c.body_b.isSleeping()||c.unthread()}for(h.length=0,this.lock(),e=0;e<o.length;e++)o[e].position_func(t);this.activeShapes.each(oi),this.activeShapes.reindexQuery(this.collideShapes),this.unlock(!1),this.processComponents(t),this.lock();for(n in this.cachedArbiters)this.arbiterSetFilter(this.cachedArbiters[n])||delete this.cachedArbiters[n];var p=this.collisionSlop,u=1-Math.pow(this.collisionBias,t);for(e=0;e<h.length;e++)h[e].preStep(t,p,u);for(e=0;e<a.length;e++){var l=a[e];l.preSolve(this),l.preStep(t)}var y=Math.pow(this.damping,t),b=this.gravity;for(e=0;e<o.length;e++)o[e].velocity_func(b,y,t);var f=0===i?0:t/i;for(e=0;e<h.length;e++)h[e].applyCachedImpulse(f);for(e=0;e<a.length;e++)a[e].applyCachedImpulse(f);for(e=0;e<this.iterations;e++){for(s=0;s<h.length;s++)h[s].applyImpulse();for(s=0;s<a.length;s++)a[s].applyImpulse()}for(e=0;e<a.length;e++)a[e].postSolve(this);for(e=0;e<h.length;e++)h[e].handler.postSolve(h[e],this);this.unlock(!0)}};var ai=function(t,i,e,s){var n=t.vx+-e.y*t.w,r=t.vy+e.x*t.w,o=i.vx+-s.y*i.w,a=i.vy+s.x*i.w;return new x(o-n,a-r)},hi=function(t,i,e,s,n){var r=t.vx+-e.y*t.w,o=t.vy+e.x*t.w,a=i.vx+-s.y*i.w,h=i.vy+s.x*i.w;return w(a-r,h-o,n.x,n.y)},ci=function(t,i,e,s){t.vx+=i*t.m_inv,t.vy+=e*t.m_inv,t.w+=t.i_inv*(s.x*e-s.y*i)},pi=function(t,i,e,s,n,r){ci(t,-n,-r,e),ci(i,n,r,s)},ui=function(t,i,e,s){t.v_biasx+=i*t.m_inv,t.v_biasy+=e*t.m_inv,t.w_bias+=t.i_inv*I(s.x,s.y,i,e)},li=function(t,i,e){var s=M(i,e);return t.m_inv+t.i_inv*s*s},yi=function(t,i,e,s,n){var r=li(t,e,n)+li(i,s,n);return o(0!==r,"Unsolvable collision or constraint."),r},bi=function(t,i,e,s,n,r){var a,h,c,p,u=t.m_inv+i.m_inv;a=u,h=0,c=0,p=u;var l=t.i_inv,y=e.x*e.x*l,b=e.y*e.y*l,f=-e.x*e.y*l;a+=b,h+=f,c+=f,p+=y;var v=i.i_inv,d=s.x*s.x*v,_=s.y*s.y*v,x=-s.x*s.y*v;a+=_,h+=x,c+=x,p+=d;var g=a*p-h*c;o(0!==g,"Unsolvable constraint.");var m=1/g;n.x=p*m,n.y=-h*m,r.x=-c*m,r.y=a*m},fi=function(t,i,e){return new x(m(t,i),m(t,e))},vi=function(t,i){return 1-Math.pow(t,i)},di=t.Constraint=function(t,i){this.a=t,this.b=i,this.space=null,this.next_a=null,this.next_b=null,this.maxForce=1/0,this.errorBias=Math.pow(.9,60),this.maxBias=1/0};di.prototype.activateBodies=function(){this.a&&this.a.activate(),this.b&&this.b.activate()},di.prototype.preStep=function(t){},di.prototype.applyCachedImpulse=function(t){},di.prototype.applyImpulse=function(){},di.prototype.getImpulse=function(){return 0},di.prototype.preSolve=function(t){},di.prototype.postSolve=function(t){},di.prototype.next=function(t){return this.a===t?this.next_a:this.next_b};var _i=t.PinJoint=function(t,i,e,s){di.call(this,t,i),this.anchr1=e,this.anchr2=s;var n=t?j(t.p,$(e,t.rot)):e,r=i?j(i.p,$(s,i.rot)):s;this.dist=S(B(r,n)),o(this.dist>0,"You created a 0 length pin joint. A pivot joint will be much more stable."),this.r1=this.r2=null,this.n=null,this.nMass=0,this.jnAcc=this.jnMax=0,this.bias=0};_i.prototype=Object.create(di.prototype),_i.prototype.preStep=function(t){var i=this.a,e=this.b;this.r1=$(this.anchr1,i.rot),this.r2=$(this.anchr2,e.rot);var s=B(j(e.p,this.r2),j(i.p,this.r1)),n=S(s);this.n=k(s,1/(n?n:1/0)),this.nMass=1/yi(i,e,this.r1,this.r2,this.n);var r=this.maxBias;this.bias=d(-vi(this.errorBias,t)*(n-this.dist)/t,-r,r),this.jnMax=this.maxForce*t},_i.prototype.applyCachedImpulse=function(t){var i=k(this.n,this.jnAcc*t);pi(this.a,this.b,this.r1,this.r2,i.x,i.y)},_i.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=this.n,s=hi(t,i,this.r1,this.r2,e),n=(this.bias-s)*this.nMass,r=this.jnAcc;this.jnAcc=d(r+n,-this.jnMax,this.jnMax),n=this.jnAcc-r,pi(t,i,this.r1,this.r2,e.x*n,e.y*n)},_i.prototype.getImpulse=function(){return Math.abs(this.jnAcc)};var xi=t.SlideJoint=function(t,i,e,s,n,r){di.call(this,t,i),this.anchr1=e,this.anchr2=s,this.min=n,this.max=r,this.r1=this.r2=this.n=null,this.nMass=0,this.jnAcc=this.jnMax=0,this.bias=0};xi.prototype=Object.create(di.prototype),xi.prototype.preStep=function(t){var i=this.a,e=this.b;this.r1=$(this.anchr1,i.rot),this.r2=$(this.anchr2,e.rot);var s=B(j(e.p,this.r2),j(i.p,this.r1)),n=S(s),r=0;n>this.max?(r=n-this.max,this.n=Q(s)):n<this.min?(r=this.min-n,this.n=C(Q(s))):(this.n=g,this.jnAcc=0),this.nMass=1/yi(i,e,this.r1,this.r2,this.n);var o=this.maxBias;this.bias=d(-vi(this.errorBias,t)*r/t,-o,o),this.jnMax=this.maxForce*t},xi.prototype.applyCachedImpulse=function(t){var i=this.jnAcc*t;pi(this.a,this.b,this.r1,this.r2,this.n.x*i,this.n.y*i)},xi.prototype.applyImpulse=function(){if(0!==this.n.x||0!==this.n.y){var t=this.a,i=this.b,e=this.n,s=this.r1,n=this.r2,r=ai(t,i,s,n),o=m(r,e),a=(this.bias-o)*this.nMass,h=this.jnAcc;this.jnAcc=d(h+a,-this.jnMax,0),a=this.jnAcc-h,pi(t,i,this.r1,this.r2,e.x*a,e.y*a)}},xi.prototype.getImpulse=function(){return Math.abs(this.jnAcc)};var gi=t.PivotJoint=function(t,i,e,s){if(di.call(this,t,i),"undefined"==typeof s){var n=e;e=t?t.world2Local(n):n,s=i?i.world2Local(n):n}this.anchr1=e,this.anchr2=s,this.r1=this.r2=g,this.k1=new x(0,0),this.k2=new x(0,0),this.jAcc=g,this.jMaxLen=0,this.bias=g};gi.prototype=Object.create(di.prototype),gi.prototype.preStep=function(t){var i=this.a,e=this.b;this.r1=$(this.anchr1,i.rot),this.r2=$(this.anchr2,e.rot),bi(i,e,this.r1,this.r2,this.k1,this.k2),this.jMaxLen=this.maxForce*t;var s=B(j(e.p,this.r2),j(i.p,this.r1));this.bias=O(k(s,-vi(this.errorBias,t)/t),this.maxBias)},gi.prototype.applyCachedImpulse=function(t){pi(this.a,this.b,this.r1,this.r2,this.jAcc.x*t,this.jAcc.y*t)},gi.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=this.r1,s=this.r2,n=ai(t,i,e,s),r=fi(B(this.bias,n),this.k1,this.k2),o=this.jAcc;this.jAcc=O(j(this.jAcc,r),this.jMaxLen),pi(t,i,this.r1,this.r2,this.jAcc.x-o.x,this.jAcc.y-o.y)},gi.prototype.getImpulse=function(){return S(this.jAcc)};var mi=t.GrooveJoint=function(t,i,e,s,n){di.call(this,t,i),this.grv_a=e,this.grv_b=s,this.grv_n=P(T(B(s,e))),this.anchr2=n,this.grv_tn=null,this.clamp=0,this.r1=this.r2=null,this.k1=new x(0,0),this.k2=new x(0,0),this.jAcc=g,this.jMaxLen=0,this.bias=null};mi.prototype=Object.create(di.prototype),mi.prototype.preStep=function(t){var i=this.a,e=this.b,s=i.local2World(this.grv_a),n=i.local2World(this.grv_b),r=$(this.grv_n,i.rot),o=m(s,r);this.grv_tn=r,this.r2=$(this.anchr2,e.rot);var a=M(j(e.p,this.r2),r);a<=M(s,r)?(this.clamp=1,this.r1=B(s,i.p)):a>=M(n,r)?(this.clamp=-1,this.r1=B(n,i.p)):(this.clamp=0,this.r1=B(j(k(P(r),-a),k(r,o)),i.p)),bi(i,e,this.r1,this.r2,this.k1,this.k2),this.jMaxLen=this.maxForce*t;var h=B(j(e.p,this.r2),j(i.p,this.r1));this.bias=O(k(h,-vi(this.errorBias,t)/t),this.maxBias)},mi.prototype.applyCachedImpulse=function(t){pi(this.a,this.b,this.r1,this.r2,this.jAcc.x*t,this.jAcc.y*t)},mi.prototype.grooveConstrain=function(t){var i=this.grv_tn,e=this.clamp*M(t,i)>0?t:L(t,i);return O(e,this.jMaxLen)},mi.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=this.r1,s=this.r2,n=ai(t,i,e,s),r=fi(B(this.bias,n),this.k1,this.k2),o=this.jAcc;this.jAcc=this.grooveConstrain(j(o,r)),pi(t,i,this.r1,this.r2,this.jAcc.x-o.x,this.jAcc.y-o.y)},mi.prototype.getImpulse=function(){return S(this.jAcc)},mi.prototype.setGrooveA=function(t){this.grv_a=t,this.grv_n=P(T(B(this.grv_b,t))),this.activateBodies()},mi.prototype.setGrooveB=function(t){this.grv_b=t,this.grv_n=P(T(B(t,this.grv_a))),this.activateBodies()};var wi=function(t,i){return(t.restLength-i)*t.stiffness},Si=t.DampedSpring=function(t,i,e,s,n,r,o){di.call(this,t,i),this.anchr1=e,this.anchr2=s,this.restLength=n,this.stiffness=r,this.damping=o,this.springForceFunc=wi,this.target_vrn=this.v_coef=0,this.r1=this.r2=null,this.nMass=0,this.n=null};Si.prototype=Object.create(di.prototype),Si.prototype.preStep=function(t){var i=this.a,e=this.b;this.r1=$(this.anchr1,i.rot),this.r2=$(this.anchr2,e.rot);var s=B(j(e.p,this.r2),j(i.p,this.r1)),n=S(s);this.n=k(s,1/(n?n:1/0));var r=yi(i,e,this.r1,this.r2,this.n);o(0!==r,"Unsolvable this."),this.nMass=1/r,this.target_vrn=0,this.v_coef=1-Math.exp(-this.damping*t*r);var a=this.springForceFunc(this,n);pi(i,e,this.r1,this.r2,this.n.x*a*t,this.n.y*a*t)},Si.prototype.applyCachedImpulse=function(t){},Si.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=this.n,s=this.r1,n=this.r2,r=hi(t,i,s,n,e),o=(this.target_vrn-r)*this.v_coef;this.target_vrn=r+o,o*=this.nMass,pi(t,i,this.r1,this.r2,this.n.x*o,this.n.y*o)},Si.prototype.getImpulse=function(){return 0};var Ai=function(t,i){return(i-t.restAngle)*t.stiffness},ji=t.DampedRotarySpring=function(t,i,e,s,n){di.call(this,t,i),this.restAngle=e,this.stiffness=s,this.damping=n,this.springTorqueFunc=Ai,this.target_wrn=0,this.w_coef=0,this.iSum=0};ji.prototype=Object.create(di.prototype),ji.prototype.preStep=function(t){var i=this.a,e=this.b,s=i.i_inv+e.i_inv;o(0!==s,"Unsolvable spring."),this.iSum=1/s,this.w_coef=1-Math.exp(-this.damping*t*s),this.target_wrn=0;var n=this.springTorqueFunc(this,i.a-e.a)*t;i.w-=n*i.i_inv,e.w+=n*e.i_inv},ji.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=t.w-i.w,s=(this.target_wrn-e)*this.w_coef;this.target_wrn=e+s;var n=s*this.iSum;t.w+=n*t.i_inv,i.w-=n*i.i_inv};var Bi=t.RotaryLimitJoint=function(t,i,e,s){di.call(this,t,i),this.min=e,this.max=s,this.jAcc=0,this.iSum=this.bias=this.jMax=0};Bi.prototype=Object.create(di.prototype),Bi.prototype.preStep=function(t){var i=this.a,e=this.b,s=e.a-i.a,n=0;s>this.max?n=this.max-s:s<this.min&&(n=this.min-s),this.iSum=1/(1/i.i+1/e.i);var r=this.maxBias;this.bias=d(-vi(this.errorBias,t)*n/t,-r,r),this.jMax=this.maxForce*t,this.bias||(this.jAcc=0)},Bi.prototype.applyCachedImpulse=function(t){var i=this.a,e=this.b,s=this.jAcc*t;i.w-=s*i.i_inv,e.w+=s*e.i_inv},Bi.prototype.applyImpulse=function(){if(this.bias){var t=this.a,i=this.b,e=i.w-t.w,s=-(this.bias+e)*this.iSum,n=this.jAcc;this.jAcc=this.bias<0?d(n+s,0,this.jMax):d(n+s,-this.jMax,0),s=this.jAcc-n,t.w-=s*t.i_inv,i.w+=s*i.i_inv}},Bi.prototype.getImpulse=function(){return Math.abs(joint.jAcc)};var Ci=t.RatchetJoint=function(t,i,e,s){di.call(this,t,i),this.angle=0,this.phase=e,this.ratchet=s,this.angle=(i?i.a:0)-(t?t.a:0),this.iSum=this.bias=this.jAcc=this.jMax=0};Ci.prototype=Object.create(di.prototype),Ci.prototype.preStep=function(t){var i=this.a,e=this.b,s=this.angle,n=this.phase,r=this.ratchet,o=e.a-i.a,a=s-o,h=0;a*r>0?h=a:this.angle=Math.floor((o-n)/r)*r+n,this.iSum=1/(i.i_inv+e.i_inv);var c=this.maxBias;this.bias=d(-vi(this.errorBias,t)*h/t,-c,c),this.jMax=this.maxForce*t,this.bias||(this.jAcc=0)},Ci.prototype.applyCachedImpulse=function(t){var i=this.a,e=this.b,s=this.jAcc*t;i.w-=s*i.i_inv,e.w+=s*e.i_inv},Ci.prototype.applyImpulse=function(){if(this.bias){var t=this.a,i=this.b,e=i.w-t.w,s=this.ratchet,n=-(this.bias+e)*this.iSum,r=this.jAcc;this.jAcc=d((r+n)*s,0,this.jMax*Math.abs(s))/s,n=this.jAcc-r,t.w-=n*t.i_inv,i.w+=n*i.i_inv}},Ci.prototype.getImpulse=function(t){return Math.abs(t.jAcc)};var ki=t.GearJoint=function(t,i,e,s){di.call(this,t,i),this.phase=e,this.ratio=s,this.ratio_inv=1/s,this.jAcc=0,this.iSum=this.bias=this.jMax=0};ki.prototype=Object.create(di.prototype),ki.prototype.preStep=function(t){var i=this.a,e=this.b;this.iSum=1/(i.i_inv*this.ratio_inv+this.ratio*e.i_inv);var s=this.maxBias;this.bias=d(-vi(this.errorBias,t)*(e.a*this.ratio-i.a-this.phase)/t,-s,s),this.jMax=this.maxForce*t},ki.prototype.applyCachedImpulse=function(t){var i=this.a,e=this.b,s=this.jAcc*t;i.w-=s*i.i_inv*this.ratio_inv,e.w+=s*e.i_inv},ki.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=i.w*this.ratio-t.w,s=(this.bias-e)*this.iSum,n=this.jAcc;this.jAcc=d(n+s,-this.jMax,this.jMax),s=this.jAcc-n,t.w-=s*t.i_inv*this.ratio_inv,i.w+=s*i.i_inv},ki.prototype.getImpulse=function(){return Math.abs(this.jAcc)},ki.prototype.setRatio=function(t){this.ratio=t,this.ratio_inv=1/t,this.activateBodies()};var Mi=t.SimpleMotor=function(t,i,e){di.call(this,t,i),this.rate=e,this.jAcc=0,this.iSum=this.jMax=0};Mi.prototype=Object.create(di.prototype),Mi.prototype.preStep=function(t){this.iSum=1/(this.a.i_inv+this.b.i_inv),this.jMax=this.maxForce*t},Mi.prototype.applyCachedImpulse=function(t){var i=this.a,e=this.b,s=this.jAcc*t;i.w-=s*i.i_inv,e.w+=s*e.i_inv},Mi.prototype.applyImpulse=function(){var t=this.a,i=this.b,e=i.w-t.w+this.rate,s=-e*this.iSum,n=this.jAcc;this.jAcc=d(n+s,-this.jMax,this.jMax),s=this.jAcc-n,t.w-=s*t.i_inv,i.w+=s*i.i_inv},Mi.prototype.getImpulse=function(){return Math.abs(this.jAcc)}}()},77:function(t,i,e){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function n(){var t=new d.Space;t.gravity=new d.Vect(0,this.physics.gravity*-500),this.on("beforeTick",function(i){for(var e=.01*(this.$canvas.maxFps>0?this.$canvas.maxFps:60)/60,s=0;s<this.physics.accuracy;s++)t.step(e)}),this.$physics={space:t};var i=function(i){return function(e){var s=e.a.$sprite.trigger(i,e.b.$sprite,e.b.$sprite.physics.collisionType,e,t),n=e.b.$sprite.trigger(i,e.a.$sprite,e.a.$sprite.physics.collisionType,e,t);return!(s||n)}};return t.setDefaultCollisionHandler(i("physicsCollisionBegin"),i("physicsCollisionPreSolve"),i("physicsCollisionPostSolve"),i("physicsCollisionSeparate")),t.$sprite=this,t}function r(t){return t.$parent?t.$parent.$physics&&t.$parent.$physics.space?t.$parent:r(t.$parent):null}function o(t){var i=t.physics;if(i){var e=r(t);if(!e)return void v("No physics container found launched.");var s=e.$physics.space;if(t.$physics={space:s},!i.shape.length)return;var n=i.shape,o=void 0,a=[];i.static||(o=new d.Body(i.mass,i.moment)),n.forEach(function(n,r){var h=void 0,c=t.getStyle("tx"),p=t.getStyle("ty"),u=e.getStyle("tx"),y=e.getStyle("ty");if(3!==n.length||n[0].length){if(n.length>=3){var b=t.style.rx||t.getRect().tx+t.getRect().tw/2,v=t.style.ry||t.getRect().ty+t.getRect().th/2,_=n.map(function(i){var e=(0,l.default)(i[0]+c-u,i[1]+p+y,b-u,v+y,t.style.rotate||0);return[e.x-c,e.y-p]}).join(",").split(",").map(function(t,i){var e=Number(t),s=i%2?-e:e;return s?s:0}),g=o?d.vzero:{x:c-u,y:-p+y};h=new d.PolyShape(o||s.staticBody,_,g)}else if(2===n.length){var m=t.style.rx||t.getRect().tx+t.getRect().tw/2,w=t.style.ry||t.getRect().ty+t.getRect().th/2,S=(0,l.default)(n[0][0]+c-u,n[0][1]+p+y,m-u,w+y,t.style.rotate||0),A=(0,l.default)(n[1][0]+c-u,n[1][1]+p+y,m-u,w+y,t.style.rotate||0);S.x-=c,S.y-=p,A.x-=c,A.y-=p,h=new d.SegmentShape(s.staticBody,x(S),x(A),0)}}else{var j=o?d.vzero:{x:c-u,y:-p+y};h=new d.CircleShape(o||s.staticBody,n[2],j)}h.setFriction(f(i,"friction",r)),h.setElasticity(f(i,"elasticity",r)),h.setCollisionType(f(i,"collisionType",r)),h.group=f(i,"group",r),h.$sprite=t,a.push(h)}),t.$physics.body=o,t.$physics.shape=a,o&&(o.$sprite=t)}}var a=e(28),h=s(a),c=e(1),p=s(c),u=e(2),l=s(u),y=p.default.firstValuable,b="undefined"!=typeof window,f=function(t,i,e){return y(t[i][e],t[i])},v=function(t){console.error("[Easycanvas-physics] "+t)},d=h.default,_=function(t){if(t.physics){var i=this;if(i.physics=i.physics||{},i.physics.shape=i.physics.shape||[],i.physics.gravity=y(i.physics.gravity,2),i.physics.accuracy=y(i.physics.accuracy,2),i.physics.friction=y(i.physics.friction,0),i.physics.elasticity=y(i.physics.elasticity,0),i.physics.group=y(i.physics.group,0),i.physics.collisionType=y(i.physics.collisionType,0),!i.physics.static&&i.physics.shape.length){i.physics.mass=y(i.physics.mass,0);var e=void 0;if(3===i.physics.shape[0].length)e=d.momentForCircle(i.physics.mass,0,i.physics.shape[0][2],d.vzero);else{var s=i.physics.shape.join(",").split(",").map(function(t,i){var e=Number(t),s=i%2?-e:e;return s?s:0});e=d.momentForPoly(i.physics.mass,s,d.vzero)}i.physics.moment=y(i.physics.moment,e)}i.launch=n.bind(i),i.physicsOff=function(){return i.$physics?(i.$physics.inSpace=!1,i.$physics.body&&i.$physics.space.removeBody(i.$physics.body),i.$physics.shape.forEach(function(t){i.$physics.space.removeShape(t)}),i.$physics=null,this):this},i.physicsOn=function(){var t=this;return this.$physics||o(this),this.$physics?(this.$physics.inSpace=!0,this.$physics.body&&this.$physics.body.setPos(new d.Vect(this.getRect().tx+this.getRect().tw/2,-this.getRect().ty-this.getRect().th/2)),this.$physics.body&&this.$physics.space.addBody(this.$physics.body),this.$physics.shape&&this.$physics.shape.forEach(function(i){t.$physics.space[t.physics.static?"addStaticShape":"addShape"](i)}),this.children.forEach(function(i){t.physicsOn.call(i);
}),this):this},i.physicsSetVelocity=function(t){if(i.$physics)return i.$physics.body?(i.$physics.body.setVel({x:t.x,y:-t.y}),this):this},i.physicsGetVelocity=function(){if(i.$physics){if(!i.$physics.body)return this;var t=i.$physics.body.getVel();return t.y=-t.y,t}},i.physicsApplyImpulse=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0};if(i.$physics)return i.$physics.body?(t.y=-t.y,e.y=-e.y,i.$physics.body.applyImpulse(t,e),this):this},i.physicsGetAngelVelocity=function(){if(i.$physics)return i.$physics.body?i.$physics.body.getAngVel():this},i.physicsSetAngelVelocity=function(t){if(i.$physics)return i.$physics.body?(i.$physics.body.setVel(t),this):this},i.physicsApplyForce=function(t){return i.$physics&&i.$physics.body?(i.$physics.body.applyForce({x:t.x,y:-t.y},{x:t.x,y:t.y}),this):this},i.physicsResetForces=function(){return i.$physics.body.resetForces(),this},i.on("beforeTick",function(t){i.$physics&&i.physics&&(i.physics.static||i.$physics.inSpace!==!1&&i.$physics.body&&g(i.$physics.body,i))})}},x=function(t){return new d.Vect(t.x,t.y?-t.y:0)},g=function(t,i){var e=t.getPos();t.getVel();i.style.rotate=180*t.a/Math.PI,i.style.tx=e.x,i.style.ty=-e.y,"lt"===i.style.locate?(i.style.tx-=i.getRect().tw/2,i.style.ty-=i.getRect().th/2):"ld"===i.style.locate?(i.style.tx-=i.getRect().tw/2,i.style.ty+=i.getRect().th/2):"rd"===i.style.locate?(i.style.tx+=i.getRect().tw/2,i.style.ty+=i.getRect().th/2):"rt"===i.style.locate&&(i.style.tx+=i.getRect().tw/2,i.style.ty-=i.getRect().th/2)};b&&window.Easycanvas?Easycanvas.extend(_):t.exports=_}})});
=======
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(77);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	'use strict';

	var utils = {
	    isArray: Array.isArray || function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    },

	    funcOrValue: function funcOrValue(_funcOrValue, _this) {
	        if (typeof _funcOrValue === 'function') {
	            var res = _funcOrValue.call(_this);
	            return res;
	        }

	        return _funcOrValue;
	    },

	    // 执行钩子函数或者钩子函数队列
	    execFuncs: function execFuncs(funcOrArray, _this, _arg) {
	        if (funcOrArray) {
	            if (!utils.isArray(_arg)) {
	                _arg = [_arg];
	            }
	        }

	        if (typeof funcOrArray === 'function') {
	            return funcOrArray.apply(_this, _arg);
	        } else if (utils.isArray(funcOrArray)) {
	            var res = [];
	            funcOrArray.forEach(function (f) {
	                res.push(f && f.apply(_this, _arg));
	            });
	            return res;
	        }
	    },

	    blend: ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],

	    pointInRect: function pointInRect(x, y, x1, x2, y1, y2) {
	        return !(x < x1 || x > x2 || y < y1 || y > y2);
	    },

	    firstValuable: function firstValuable(a, b, c) {
	        // 效率低
	        // for (let i = 0; i < arguments.length; i++) {
	        //     if (typeof arguments[i] !== 'undefined') {
	        //         return arguments[i];
	        //     }
	        // }
	        return typeof a === 'undefined' ? typeof b === 'undefined' ? c : b : a;
	    }
	};

	module.exports = utils;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	"use strict";

	var PI = 3.141593;

	module.exports = function (x, y, rx0, ry0, d, returnArr) {
	    var deg = d ? -d / 180 * PI : 0;
	    var _x = x,
	        _y = y;

	    if (d) {
	        _x = (x - rx0) * Math.cos(deg) - (y - ry0) * Math.sin(deg) + rx0;
	        _y = (x - rx0) * Math.sin(deg) + (y - ry0) * Math.cos(deg) + ry0;
	    }

	    if (returnArr) {
	        return [_x, _y];
	    }

	    return {
	        x: _x,
	        y: _y
	    };
	};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Some lines modified by chenzhuo04, fixing some bugs.

	(function () {
	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    Object.create = Object.create || function (o) {
	        function F() {}
	        F.prototype = o;
	        return new F();
	    };

	    // var VERSION = CP_VERSION_MAJOR + "." + CP_VERSION_MINOR + "." + CP_VERSION_RELEASE;

	    var cp;
	    if (false) {
	        cp = {};

	        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	            window.cp = cp;
	        }
	    } else {
	        cp = exports;
	    }

	    var assert = function assert(value, message) {
	        return;
	        if (!value) {
	            throw new Error('Assertion failed: ' + message);
	        }
	    };

	    var assertSoft = function assertSoft(value, message) {
	        return;
	        if (!value && console && console.warn) {
	            console.warn("ASSERTION FAILED: " + message);
	            if (console.trace) {
	                console.trace();
	            }
	        }
	    };

	    var mymin = function mymin(a, b) {
	        return a < b ? a : b;
	    };
	    var mymax = function mymax(a, b) {
	        return a > b ? a : b;
	    };

	    var min, max;
	    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.navigator.userAgent.indexOf('Firefox') > -1) {
	        // On firefox, Math.min and Math.max are really fast:
	        // http://jsperf.com/math-vs-greater-than/8
	        min = Math.min;
	        max = Math.max;
	    } else {
	        // On chrome and safari, Math.min / max are slooow. The ternery operator above is faster
	        // than the builtins because we only have to deal with 2 arguments that are always numbers.
	        min = mymin;
	        max = mymax;
	    }

	    /* The hashpair function takes two numbers and returns a hash code for them.
	     * Required that hashPair(a, b) === hashPair(b, a).
	     * Chipmunk's hashPair function is defined as:
	     *   #define CP_HASH_COEF (3344921057ul)
	     *   #define CP_HASH_PAIR(A, B) ((cpHashValue)(A)*CP_HASH_COEF ^ (cpHashValue)(B)*CP_HASH_COEF)
	     * But thats not suitable in javascript because multiplying by a large number will make the number
	     * a large float.
	     *
	     * The result of hashPair is used as the key in objects, so it returns a string.
	     */
	    var hashPair = function hashPair(a, b) {
	        //assert(typeof(a) === 'number', "HashPair used on something not a number");
	        return a < b ? a + ' ' + b : b + ' ' + a;
	    };

	    var deleteObjFromList = function deleteObjFromList(arr, obj) {
	        for (var i = 0; i < arr.length; i++) {
	            if (arr[i] === obj) {
	                arr[i] = arr[arr.length - 1];
	                arr.length--;

	                return;
	            }
	        }
	    };

	    var closestPointOnSegment = function closestPointOnSegment(p, a, b) {
	        var delta = vsub(a, b);
	        var t = clamp01(vdot(delta, vsub(p, b)) / vlengthsq(delta));
	        return vadd(b, vmult(delta, t));
	    };

	    var closestPointOnSegment2 = function closestPointOnSegment2(px, py, ax, ay, bx, by) {
	        var deltax = ax - bx;
	        var deltay = ay - by;
	        var t = clamp01(vdot2(deltax, deltay, px - bx, py - by) / vlengthsq2(deltax, deltay));
	        return new Vect(bx + deltax * t, by + deltay * t);
	    };

	    cp.momentForCircle = function (m, r1, r2, offset) {
	        return m * (0.5 * (r1 * r1 + r2 * r2) + vlengthsq(offset));
	    };

	    cp.areaForCircle = function (r1, r2) {
	        return Math.PI * Math.abs(r1 * r1 - r2 * r2);
	    };

	    cp.momentForSegment = function (m, a, b) {
	        var offset = vmult(vadd(a, b), 0.5);
	        return m * (vdistsq(b, a) / 12 + vlengthsq(offset));
	    };

	    cp.areaForSegment = function (a, b, r) {
	        return r * (Math.PI * r + 2 * vdist(a, b));
	    };

	    cp.momentForPoly = function (m, verts, offset) {
	        var sum1 = 0;
	        var sum2 = 0;
	        var len = verts.length;
	        for (var i = 0; i < len; i += 2) {
	            var v1x = verts[i] + offset.x;
	            var v1y = verts[i + 1] + offset.y;
	            var v2x = verts[(i + 2) % len] + offset.x;
	            var v2y = verts[(i + 3) % len] + offset.y;

	            var a = vcross2(v2x, v2y, v1x, v1y);
	            var b = vdot2(v1x, v1y, v1x, v1y) + vdot2(v1x, v1y, v2x, v2y) + vdot2(v2x, v2y, v2x, v2y);

	            sum1 += a * b;
	            sum2 += a;
	        }

	        return m * sum1 / (6 * sum2);
	    };

	    cp.areaForPoly = function (verts) {
	        var area = 0;
	        for (var i = 0, len = verts.length; i < len; i += 2) {
	            area += vcross(new Vect(verts[i], verts[i + 1]), new Vect(verts[(i + 2) % len], verts[(i + 3) % len]));
	        }

	        return -area / 2;
	    };

	    cp.centroidForPoly = function (verts) {
	        var sum = 0;
	        var vsum = new Vect(0, 0);

	        for (var i = 0, len = verts.length; i < len; i += 2) {
	            var v1 = new Vect(verts[i], verts[i + 1]);
	            var v2 = new Vect(verts[(i + 2) % len], verts[(i + 3) % len]);
	            var cross = vcross(v1, v2);

	            sum += cross;
	            vsum = vadd(vsum, vmult(vadd(v1, v2), cross));
	        }

	        return vmult(vsum, 1 / (3 * sum));
	    };

	    cp.recenterPoly = function (verts) {
	        var centroid = cp.centroidForPoly(verts);

	        for (var i = 0; i < verts.length; i += 2) {
	            verts[i] -= centroid.x;
	            verts[i + 1] -= centroid.y;
	        }
	    };

	    cp.momentForBox = function (m, width, height) {
	        return m * (width * width + height * height) / 12;
	    };

	    cp.momentForBox2 = function (m, box) {
	        var width = box.r - box.l;
	        var height = box.t - box.b;
	        var offset = vmult([box.l + box.r, box.b + box.t], 0.5);

	        // TODO NaN when offset is 0 and m is INFINITY
	        return cp.momentForBox(m, width, height) + m * vlengthsq(offset);
	    };

	    // Quick hull

	    var loopIndexes = cp.loopIndexes = function (verts) {
	        var start = 0,
	            end = 0;
	        var minx, miny, maxx, maxy;
	        minx = maxx = verts[0];
	        miny = maxy = verts[1];

	        var count = verts.length >> 1;
	        for (var i = 1; i < count; i++) {
	            var x = verts[i * 2];
	            var y = verts[i * 2 + 1];

	            if (x < minx || x == minx && y < miny) {
	                minx = x;
	                miny = y;
	                start = i;
	            } else if (x > maxx || x == maxx && y > maxy) {
	                maxx = x;
	                maxy = y;
	                end = i;
	            }
	        }
	        return [start, end];
	    };

	    var SWAP = function SWAP(arr, idx1, idx2) {
	        var tmp = arr[idx1 * 2];
	        arr[idx1 * 2] = arr[idx2 * 2];
	        arr[idx2 * 2] = tmp;

	        tmp = arr[idx1 * 2 + 1];
	        arr[idx1 * 2 + 1] = arr[idx2 * 2 + 1];
	        arr[idx2 * 2 + 1] = tmp;
	    };

	    var QHullPartition = function QHullPartition(verts, offs, count, a, b, tol) {
	        if (count === 0) return 0;

	        var max = 0;
	        var pivot = offs;

	        var delta = vsub(b, a);
	        var valueTol = tol * vlength(delta);

	        var head = offs;
	        for (var tail = offs + count - 1; head <= tail;) {
	            var v = new Vect(verts[head * 2], verts[head * 2 + 1]);
	            var value = vcross(delta, vsub(v, a));
	            if (value > valueTol) {
	                if (value > max) {
	                    max = value;
	                    pivot = head;
	                }

	                head++;
	            } else {
	                SWAP(verts, head, tail);
	                tail--;
	            }
	        }

	        // move the new pivot to the front if it's not already there.
	        if (pivot != offs) SWAP(verts, offs, pivot);
	        return head - offs;
	    };

	    var QHullReduce = function QHullReduce(tol, verts, offs, count, a, pivot, b, resultPos) {
	        if (count < 0) {
	            return 0;
	        } else if (count == 0) {
	            verts[resultPos * 2] = pivot.x;
	            verts[resultPos * 2 + 1] = pivot.y;
	            return 1;
	        } else {
	            var left_count = QHullPartition(verts, offs, count, a, pivot, tol);
	            var left = new Vect(verts[offs * 2], verts[offs * 2 + 1]);
	            var index = QHullReduce(tol, verts, offs + 1, left_count - 1, a, left, pivot, resultPos);

	            var pivotPos = resultPos + index++;
	            verts[pivotPos * 2] = pivot.x;
	            verts[pivotPos * 2 + 1] = pivot.y;

	            var right_count = QHullPartition(verts, offs + left_count, count - left_count, pivot, b, tol);
	            var right = new Vect(verts[(offs + left_count) * 2], verts[(offs + left_count) * 2 + 1]);
	            return index + QHullReduce(tol, verts, offs + left_count + 1, right_count - 1, pivot, right, b, resultPos + index);
	        }
	    };

	    // QuickHull seemed like a neat algorithm, and efficient-ish for large input sets.
	    // My implementation performs an in place reduction using the result array as scratch space.
	    //
	    // Pass an Array into result to put the result of the calculation there. Otherwise, pass null
	    // and the verts list will be edited in-place.
	    //
	    // Expects the verts to be described in the same way as cpPolyShape - which is to say, it should
	    // be a list of [x1,y1,x2,y2,x3,y3,...].
	    //
	    // tolerance is in world coordinates. Eg, 2.
	    cp.convexHull = function (verts, result, tolerance) {
	        if (result) {
	            // Copy the line vertexes into the empty part of the result polyline to use as a scratch buffer.
	            for (var i = 0; i < verts.length; i++) {
	                result[i] = verts[i];
	            }
	        } else {
	            // If a result array was not specified, reduce the input instead.
	            result = verts;
	        }

	        // Degenerate case, all points are the same.
	        var indexes = loopIndexes(verts);
	        var start = indexes[0],
	            end = indexes[1];
	        if (start == end) {
	            //if(first) (*first) = 0;
	            result.length = 2;
	            return result;
	        }

	        SWAP(result, 0, start);
	        SWAP(result, 1, end == 0 ? start : end);

	        var a = new Vect(result[0], result[1]);
	        var b = new Vect(result[2], result[3]);

	        var count = verts.length >> 1;
	        //if(first) (*first) = start;
	        var resultCount = QHullReduce(tolerance, result, 2, count - 2, a, b, a, 1) + 1;
	        result.length = resultCount * 2;

	        assertSoft(polyValidate(result), "Internal error: cpConvexHull() and cpPolyValidate() did not agree." + "Please report this error with as much info as you can.");
	        return result;
	    };

	    /// Clamp @c f to be between @c min and @c max.
	    var clamp = function clamp(f, minv, maxv) {
	        return min(max(f, minv), maxv);
	    };

	    /// Clamp @c f to be between 0 and 1.
	    var clamp01 = function clamp01(f) {
	        return max(0, min(f, 1));
	    };

	    /// Linearly interpolate (or extrapolate) between @c f1 and @c f2 by @c t percent.
	    var lerp = function lerp(f1, f2, t) {
	        return f1 * (1 - t) + f2 * t;
	    };

	    /// Linearly interpolate from @c f1 to @c f2 by no more than @c d.
	    var lerpconst = function lerpconst(f1, f2, d) {
	        return f1 + clamp(f2 - f1, -d, d);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // I'm using an array tuple here because (at time of writing) its about 3x faster
	    // than an object on firefox, and the same speed on chrome.

	    //var numVects = 0;

	    var Vect = cp.Vect = function (x, y) {
	        this.x = x;
	        this.y = y;
	        //numVects++;

	        //  var s = new Error().stack;
	        //  traces[s] = traces[s] ? traces[s]+1 : 1;
	    };

	    cp.v = function (x, y) {
	        return new Vect(x, y);
	    };

	    var vzero = cp.vzero = new Vect(0, 0);

	    // The functions below *could* be rewritten to be instance methods on Vect. I don't
	    // know how that would effect performance. For now, I'm keeping the JS similar to
	    // the original C code.

	    /// Vector dot product.
	    var vdot = cp.v.dot = function (v1, v2) {
	        return v1.x * v2.x + v1.y * v2.y;
	    };

	    var vdot2 = function vdot2(x1, y1, x2, y2) {
	        return x1 * x2 + y1 * y2;
	    };

	    /// Returns the length of v.
	    var vlength = cp.v.len = function (v) {
	        return Math.sqrt(vdot(v, v));
	    };

	    var vlength2 = cp.v.len2 = function (x, y) {
	        return Math.sqrt(x * x + y * y);
	    };

	    /// Check if two vectors are equal. (Be careful when comparing floating point numbers!)
	    var veql = cp.v.eql = function (v1, v2) {
	        return v1.x === v2.x && v1.y === v2.y;
	    };

	    /// Add two vectors
	    var vadd = cp.v.add = function (v1, v2) {
	        return new Vect(v1.x + v2.x, v1.y + v2.y);
	    };

	    Vect.prototype.add = function (v2) {
	        this.x += v2.x;
	        this.y += v2.y;
	        return this;
	    };

	    /// Subtract two vectors.
	    var vsub = cp.v.sub = function (v1, v2) {
	        return new Vect(v1.x - v2.x, v1.y - v2.y);
	    };

	    Vect.prototype.sub = function (v2) {
	        this.x -= v2.x;
	        this.y -= v2.y;
	        return this;
	    };

	    /// Negate a vector.
	    var vneg = cp.v.neg = function (v) {
	        return new Vect(-v.x, -v.y);
	    };

	    Vect.prototype.neg = function () {
	        this.x = -this.x;
	        this.y = -this.y;
	        return this;
	    };

	    /// Scalar multiplication.
	    var vmult = cp.v.mult = function (v, s) {
	        return new Vect(v.x * s, v.y * s);
	    };

	    Vect.prototype.mult = function (s) {
	        this.x *= s;
	        this.y *= s;
	        return this;
	    };

	    /// 2D vector cross product analog.
	    /// The cross product of 2D vectors results in a 3D vector with only a z component.
	    /// This function returns the magnitude of the z value.
	    var vcross = cp.v.cross = function (v1, v2) {
	        return v1.x * v2.y - v1.y * v2.x;
	    };

	    var vcross2 = function vcross2(x1, y1, x2, y2) {
	        return x1 * y2 - y1 * x2;
	    };

	    /// Returns a perpendicular vector. (90 degree rotation)
	    var vperp = cp.v.perp = function (v) {
	        return new Vect(-v.y, v.x);
	    };

	    /// Returns a perpendicular vector. (-90 degree rotation)
	    var vpvrperp = cp.v.pvrperp = function (v) {
	        return new Vect(v.y, -v.x);
	    };

	    /// Returns the vector projection of v1 onto v2.
	    var vproject = cp.v.project = function (v1, v2) {
	        return vmult(v2, vdot(v1, v2) / vlengthsq(v2));
	    };

	    Vect.prototype.project = function (v2) {
	        this.mult(vdot(this, v2) / vlengthsq(v2));
	        return this;
	    };

	    /// Uses complex number multiplication to rotate v1 by v2. Scaling will occur if v1 is not a unit vector.
	    var vrotate = cp.v.rotate = function (v1, v2) {
	        return new Vect(v1.x * v2.x - v1.y * v2.y, v1.x * v2.y + v1.y * v2.x);
	    };

	    Vect.prototype.rotate = function (v2) {
	        this.x = this.x * v2.x - this.y * v2.y;
	        this.y = this.x * v2.y + this.y * v2.x;
	        return this;
	    };

	    /// Inverse of vrotate().
	    var vunrotate = cp.v.unrotate = function (v1, v2) {
	        return new Vect(v1.x * v2.x + v1.y * v2.y, v1.y * v2.x - v1.x * v2.y);
	    };

	    /// Returns the squared length of v. Faster than vlength() when you only need to compare lengths.
	    var vlengthsq = cp.v.lengthsq = function (v) {
	        return vdot(v, v);
	    };

	    var vlengthsq2 = cp.v.lengthsq2 = function (x, y) {
	        return x * x + y * y;
	    };

	    /// Linearly interpolate between v1 and v2.
	    var vlerp = cp.v.lerp = function (v1, v2, t) {
	        return vadd(vmult(v1, 1 - t), vmult(v2, t));
	    };

	    /// Returns a normalized copy of v.
	    var vnormalize = cp.v.normalize = function (v) {
	        return vmult(v, 1 / vlength(v));
	    };

	    /// Returns a normalized copy of v or vzero if v was already vzero. Protects against divide by zero errors.
	    var vnormalize_safe = cp.v.normalize_safe = function (v) {
	        return v.x === 0 && v.y === 0 ? vzero : vnormalize(v);
	    };

	    /// Clamp v to length len.
	    var vclamp = cp.v.clamp = function (v, len) {
	        return vdot(v, v) > len * len ? vmult(vnormalize(v), len) : v;
	    };

	    /// Linearly interpolate between v1 towards v2 by distance d.
	    var vlerpconst = cp.v.lerpconst = function (v1, v2, d) {
	        return vadd(v1, vclamp(vsub(v2, v1), d));
	    };

	    /// Returns the distance between v1 and v2.
	    var vdist = cp.v.dist = function (v1, v2) {
	        return vlength(vsub(v1, v2));
	    };

	    /// Returns the squared distance between v1 and v2. Faster than vdist() when you only need to compare distances.
	    var vdistsq = cp.v.distsq = function (v1, v2) {
	        return vlengthsq(vsub(v1, v2));
	    };

	    /// Returns true if the distance between v1 and v2 is less than dist.
	    var vnear = cp.v.near = function (v1, v2, dist) {
	        return vdistsq(v1, v2) < dist * dist;
	    };

	    /// Spherical linearly interpolate between v1 and v2.
	    var vslerp = cp.v.slerp = function (v1, v2, t) {
	        var omega = Math.acos(vdot(v1, v2));

	        if (omega) {
	            var denom = 1 / Math.sin(omega);
	            return vadd(vmult(v1, Math.sin((1 - t) * omega) * denom), vmult(v2, Math.sin(t * omega) * denom));
	        } else {
	            return v1;
	        }
	    };

	    /// Spherical linearly interpolate between v1 towards v2 by no more than angle a radians
	    var vslerpconst = cp.v.slerpconst = function (v1, v2, a) {
	        var angle = Math.acos(vdot(v1, v2));
	        return vslerp(v1, v2, min(a, angle) / angle);
	    };

	    /// Returns the unit length vector for the given angle (in radians).
	    var vforangle = cp.v.forangle = function (a) {
	        return new Vect(Math.cos(a), Math.sin(a));
	    };

	    /// Returns the angular direction v is pointing in (in radians).
	    var vtoangle = cp.v.toangle = function (v) {
	        return Math.atan2(v.y, v.x);
	    };

	    /// Returns a string representation of v. Intended mostly for debugging purposes and not production use.
	    var vstr = cp.v.str = function (v) {
	        return "(" + v.x.toFixed(3) + ", " + v.y.toFixed(3) + ")";
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// Chipmunk's axis-aligned 2D bounding box type along with a few handy routines.

	    var numBB = 0;

	    // Bounding boxes are JS objects with {l, b, r, t} = left, bottom, right, top, respectively.
	    var BB = cp.BB = function (l, b, r, t) {
	        this.l = l;
	        this.b = b;
	        this.r = r;
	        this.t = t;

	        numBB++;
	    };

	    cp.bb = function (l, b, r, t) {
	        return new BB(l, b, r, t);
	    };

	    var bbNewForCircle = function bbNewForCircle(p, r) {
	        return new BB(p.x - r, p.y - r, p.x + r, p.y + r);
	    };

	    /// Returns true if @c a and @c b intersect.
	    var bbIntersects = function bbIntersects(a, b) {
	        return a.l <= b.r && b.l <= a.r && a.b <= b.t && b.b <= a.t;
	    };
	    var bbIntersects2 = function bbIntersects2(bb, l, b, r, t) {
	        return bb.l <= r && l <= bb.r && bb.b <= t && b <= bb.t;
	    };

	    /// Returns true if @c other lies completely within @c bb.
	    var bbContainsBB = function bbContainsBB(bb, other) {
	        return bb.l <= other.l && bb.r >= other.r && bb.b <= other.b && bb.t >= other.t;
	    };

	    /// Returns true if @c bb contains @c v.
	    var bbContainsVect = function bbContainsVect(bb, v) {
	        return bb.l <= v.x && bb.r >= v.x && bb.b <= v.y && bb.t >= v.y;
	    };
	    var bbContainsVect2 = function bbContainsVect2(l, b, r, t, v) {
	        return l <= v.x && r >= v.x && b <= v.y && t >= v.y;
	    };

	    /// Returns a bounding box that holds both bounding boxes.
	    var bbMerge = function bbMerge(a, b) {
	        return new BB(min(a.l, b.l), min(a.b, b.b), max(a.r, b.r), max(a.t, b.t));
	    };

	    /// Returns a bounding box that holds both @c bb and @c v.
	    var bbExpand = function bbExpand(bb, v) {
	        return new BB(min(bb.l, v.x), min(bb.b, v.y), max(bb.r, v.x), max(bb.t, v.y));
	    };

	    /// Returns the area of the bounding box.
	    var bbArea = function bbArea(bb) {
	        return (bb.r - bb.l) * (bb.t - bb.b);
	    };

	    /// Merges @c a and @c b and returns the area of the merged bounding box.
	    var bbMergedArea = function bbMergedArea(a, b) {
	        return (max(a.r, b.r) - min(a.l, b.l)) * (max(a.t, b.t) - min(a.b, b.b));
	    };

	    var bbMergedArea2 = function bbMergedArea2(bb, l, b, r, t) {
	        return (max(bb.r, r) - min(bb.l, l)) * (max(bb.t, t) - min(bb.b, b));
	    };

	    /// Return true if the bounding box intersects the line segment with ends @c a and @c b.
	    var bbIntersectsSegment = function bbIntersectsSegment(bb, a, b) {
	        return bbSegmentQuery(bb, a, b) != Infinity;
	    };

	    /// Clamp a vector to a bounding box.
	    var bbClampVect = function bbClampVect(bb, v) {
	        var x = min(max(bb.l, v.x), bb.r);
	        var y = min(max(bb.b, v.y), bb.t);
	        return new Vect(x, y);
	    };

	    // TODO edge case issue
	    /// Wrap a vector to a bounding box.
	    var bbWrapVect = function bbWrapVect(bb, v) {
	        var ix = Math.abs(bb.r - bb.l);
	        var modx = (v.x - bb.l) % ix;
	        var x = modx > 0 ? modx : modx + ix;

	        var iy = Math.abs(bb.t - bb.b);
	        var mody = (v.y - bb.b) % iy;
	        var y = mody > 0 ? mody : mody + iy;

	        return new Vect(x + bb.l, y + bb.b);
	    };
	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// Segment query info struct.
	    /* These are created using literals where needed.
	    typedef struct cpSegmentQueryInfo {
	        /// The shape that was hit, null if no collision occured.
	        cpShape *shape;
	        /// The normalized distance along the query segment in the range [0, 1].
	        cpFloat t;
	        /// The normal of the surface hit.
	        cpVect n;
	    } cpSegmentQueryInfo;
	    */

	    var shapeIDCounter = 0;

	    var CP_NO_GROUP = cp.NO_GROUP = 0;
	    var CP_ALL_LAYERS = cp.ALL_LAYERS = ~0;

	    cp.resetShapeIdCounter = function () {
	        shapeIDCounter = 0;
	    };

	    /// The cpShape struct defines the shape of a rigid body.
	    //
	    /// Opaque collision shape struct. Do not create directly - instead use
	    /// PolyShape, CircleShape and SegmentShape.
	    var Shape = cp.Shape = function (body) {
	        /// The rigid body this collision shape is attached to.
	        this.body = body;

	        /// The current bounding box of the shape.
	        this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;

	        this.hashid = shapeIDCounter++;

	        /// Sensor flag.
	        /// Sensor shapes call collision callbacks but don't produce collisions.
	        this.sensor = false;

	        /// Coefficient of restitution. (elasticity)
	        this.e = 0;
	        /// Coefficient of friction.
	        this.u = 0;
	        /// Surface velocity used when solving for friction.
	        this.surface_v = vzero;

	        /// Collision type of this shape used when picking collision handlers.
	        this.collision_type = 0;
	        /// Group of this shape. Shapes in the same group don't collide.
	        this.group = 0;
	        // Layer bitmask for this shape. Shapes only collide if the bitwise and of their layers is non-zero.
	        this.layers = CP_ALL_LAYERS;

	        this.space = null;

	        // Copy the collision code from the prototype into the actual object. This makes collision
	        // function lookups slightly faster.
	        this.collisionCode = this.collisionCode;
	    };

	    Shape.prototype.setElasticity = function (e) {
	        this.e = e;
	    };
	    Shape.prototype.setFriction = function (u) {
	        this.body.activate();this.u = u;
	    };
	    Shape.prototype.setLayers = function (layers) {
	        this.body.activate();this.layers = layers;
	    };
	    Shape.prototype.setSensor = function (sensor) {
	        this.body.activate();this.sensor = sensor;
	    };
	    Shape.prototype.setCollisionType = function (collision_type) {
	        this.body.activate();this.collision_type = collision_type;
	    };
	    Shape.prototype.getBody = function () {
	        return this.body;
	    };

	    Shape.prototype.active = function () {
	        // return shape->prev || (shape->body && shape->body->shapeList == shape);
	        return this.body && this.body.shapeList.indexOf(this) !== -1;
	    };

	    Shape.prototype.setBody = function (body) {
	        assert(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
	        this.body = body;
	    };

	    Shape.prototype.cacheBB = function () {
	        return this.update(this.body.p, this.body.rot);
	    };

	    Shape.prototype.update = function (pos, rot) {
	        assert(!isNaN(rot.x), 'Rotation is NaN');
	        assert(!isNaN(pos.x), 'Position is NaN');
	        this.cacheData(pos, rot);
	    };

	    Shape.prototype.pointQuery = function (p) {
	        var info = this.nearestPointQuery(p);
	        if (info.d < 0) return info;
	    };

	    Shape.prototype.getBB = function () {
	        return new BB(this.bb_l, this.bb_b, this.bb_r, this.bb_t);
	    };

	    /* Not implemented - all these getters and setters. Just edit the object directly.
	    CP_DefineShapeStructGetter(cpBody*, body, Body);
	    void cpShapeSetBody(cpShape *shape, cpBody *body);
	    
	    CP_DefineShapeStructGetter(cpBB, bb, BB);
	    CP_DefineShapeStructProperty(cpBool, sensor, Sensor, cpTrue);
	    CP_DefineShapeStructProperty(cpFloat, e, Elasticity, cpFalse);
	    CP_DefineShapeStructProperty(cpFloat, u, Friction, cpTrue);
	    CP_DefineShapeStructProperty(cpVect, surface_v, SurfaceVelocity, cpTrue);
	    CP_DefineShapeStructProperty(cpDataPointer, data, UserData, cpFalse);
	    CP_DefineShapeStructProperty(cpCollisionType, collision_type, CollisionType, cpTrue);
	    CP_DefineShapeStructProperty(cpGroup, group, Group, cpTrue);
	    CP_DefineShapeStructProperty(cpLayers, layers, Layers, cpTrue);
	    */

	    /// Extended point query info struct. Returned from calling pointQuery on a shape.
	    var PointQueryExtendedInfo = function PointQueryExtendedInfo(shape) {
	        /// Shape that was hit, NULL if no collision occurred.
	        this.shape = shape;
	        /// Depth of the point inside the shape.
	        this.d = Infinity;
	        /// Direction of minimum norm to the shape's surface.
	        this.n = vzero;
	    };

	    var NearestPointQueryInfo = function NearestPointQueryInfo(shape, p, d) {
	        /// The nearest shape, NULL if no shape was within range.
	        this.shape = shape;
	        /// The closest point on the shape's surface. (in world space coordinates)
	        this.p = p;
	        /// The distance to the point. The distance is negative if the point is inside the shape.
	        this.d = d;
	    };

	    var SegmentQueryInfo = function SegmentQueryInfo(shape, t, n) {
	        /// The shape that was hit, NULL if no collision occured.
	        this.shape = shape;
	        /// The normalized distance along the query segment in the range [0, 1].
	        this.t = t;
	        /// The normal of the surface hit.
	        this.n = n;
	    };

	    /// Get the hit point for a segment query.
	    SegmentQueryInfo.prototype.hitPoint = function (start, end) {
	        return vlerp(start, end, this.t);
	    };

	    /// Get the hit distance for a segment query.
	    SegmentQueryInfo.prototype.hitDist = function (start, end) {
	        return vdist(start, end) * this.t;
	    };

	    // Circles.

	    var CircleShape = cp.CircleShape = function (body, radius, offset) {
	        this.c = this.tc = offset;
	        this.r = radius;

	        this.type = 'circle';

	        Shape.call(this, body);
	    };

	    CircleShape.prototype = Object.create(Shape.prototype);

	    CircleShape.prototype.cacheData = function (p, rot) {
	        //var c = this.tc = vadd(p, vrotate(this.c, rot));
	        var c = this.tc = vrotate(this.c, rot).add(p);
	        //this.bb = bbNewForCircle(c, this.r);
	        var r = this.r;
	        this.bb_l = c.x - r;
	        this.bb_b = c.y - r;
	        this.bb_r = c.x + r;
	        this.bb_t = c.y + r;
	    };

	    /// Test if a point lies within a shape.
	    /*CircleShape.prototype.pointQuery = function(p)
	    {
	        var delta = vsub(p, this.tc);
	        var distsq = vlengthsq(delta);
	        var r = this.r;
	    
	        if(distsq < r*r){
	            var info = new PointQueryExtendedInfo(this);
	    
	            var dist = Math.sqrt(distsq);
	            info.d = r - dist;
	            info.n = vmult(delta, 1/dist);
	            return info;
	        }
	    };*/

	    CircleShape.prototype.nearestPointQuery = function (p) {
	        var deltax = p.x - this.tc.x;
	        var deltay = p.y - this.tc.y;
	        var d = vlength2(deltax, deltay);
	        var r = this.r;

	        var nearestp = new Vect(this.tc.x + deltax * r / d, this.tc.y + deltay * r / d);
	        return new NearestPointQueryInfo(this, nearestp, d - r);
	    };

	    var circleSegmentQuery = function circleSegmentQuery(shape, center, r, a, b, info) {
	        // offset the line to be relative to the circle
	        a = vsub(a, center);
	        b = vsub(b, center);

	        var qa = vdot(a, a) - 2 * vdot(a, b) + vdot(b, b);
	        var qb = -2 * vdot(a, a) + 2 * vdot(a, b);
	        var qc = vdot(a, a) - r * r;

	        var det = qb * qb - 4 * qa * qc;

	        if (det >= 0) {
	            var t = (-qb - Math.sqrt(det)) / (2 * qa);
	            if (0 <= t && t <= 1) {
	                return new SegmentQueryInfo(shape, t, vnormalize(vlerp(a, b, t)));
	            }
	        }
	    };

	    CircleShape.prototype.segmentQuery = function (a, b) {
	        return circleSegmentQuery(this, this.tc, this.r, a, b);
	    };

	    // The C API has these, and also getters. Its not idiomatic to
	    // write getters and setters in JS.
	    /*
	    CircleShape.prototype.setRadius = function(radius)
	    {
	        this.r = radius;
	    }
	    
	    CircleShape.prototype.setOffset = function(offset)
	    {
	        this.c = offset;
	    }*/

	    // Segment shape

	    var SegmentShape = cp.SegmentShape = function (body, a, b, r) {
	        this.a = a;
	        this.b = b;
	        this.n = vperp(vnormalize(vsub(b, a)));

	        this.ta = this.tb = this.tn = null;

	        this.r = r;

	        this.a_tangent = vzero;
	        this.b_tangent = vzero;

	        this.type = 'segment';
	        Shape.call(this, body);
	    };

	    SegmentShape.prototype = Object.create(Shape.prototype);

	    SegmentShape.prototype.cacheData = function (p, rot) {
	        this.ta = vadd(p, vrotate(this.a, rot));
	        this.tb = vadd(p, vrotate(this.b, rot));
	        this.tn = vrotate(this.n, rot);

	        var l, r, b, t;

	        if (this.ta.x < this.tb.x) {
	            l = this.ta.x;
	            r = this.tb.x;
	        } else {
	            l = this.tb.x;
	            r = this.ta.x;
	        }

	        if (this.ta.y < this.tb.y) {
	            b = this.ta.y;
	            t = this.tb.y;
	        } else {
	            b = this.tb.y;
	            t = this.ta.y;
	        }

	        var rad = this.r;

	        this.bb_l = l - rad;
	        this.bb_b = b - rad;
	        this.bb_r = r + rad;
	        this.bb_t = t + rad;
	    };

	    SegmentShape.prototype.nearestPointQuery = function (p) {
	        var closest = closestPointOnSegment(p, this.ta, this.tb);

	        var deltax = p.x - closest.x;
	        var deltay = p.y - closest.y;
	        var d = vlength2(deltax, deltay);
	        var r = this.r;

	        var nearestp = d ? vadd(closest, vmult(new Vect(deltax, deltay), r / d)) : closest;
	        return new NearestPointQueryInfo(this, nearestp, d - r);
	    };

	    SegmentShape.prototype.segmentQuery = function (a, b) {
	        var n = this.tn;
	        var d = vdot(vsub(this.ta, a), n);
	        var r = this.r;

	        var flipped_n = d > 0 ? vneg(n) : n;
	        var n_offset = vsub(vmult(flipped_n, r), a);

	        var seg_a = vadd(this.ta, n_offset);
	        var seg_b = vadd(this.tb, n_offset);
	        var delta = vsub(b, a);

	        if (vcross(delta, seg_a) * vcross(delta, seg_b) <= 0) {
	            var d_offset = d + (d > 0 ? -r : r);
	            var ad = -d_offset;
	            var bd = vdot(delta, n) - d_offset;

	            if (ad * bd < 0) {
	                return new SegmentQueryInfo(this, ad / (ad - bd), flipped_n);
	            }
	        } else if (r !== 0) {
	            var info1 = circleSegmentQuery(this, this.ta, this.r, a, b);
	            var info2 = circleSegmentQuery(this, this.tb, this.r, a, b);

	            if (info1) {
	                return info2 && info2.t < info1.t ? info2 : info1;
	            } else {
	                return info2;
	            }
	        }
	    };

	    SegmentShape.prototype.setNeighbors = function (prev, next) {
	        this.a_tangent = vsub(prev, this.a);
	        this.b_tangent = vsub(next, this.b);
	    };

	    SegmentShape.prototype.setEndpoints = function (a, b) {
	        this.a = a;
	        this.b = b;
	        this.n = vperp(vnormalize(vsub(b, a)));
	    };

	    /*
	    cpSegmentShapeSetRadius(cpShape *shape, cpFloat radius)
	    {
	        this.r = radius;
	    }*/

	    /*
	    CP_DeclareShapeGetter(cpSegmentShape, cpVect, A);
	    CP_DeclareShapeGetter(cpSegmentShape, cpVect, B);
	    CP_DeclareShapeGetter(cpSegmentShape, cpVect, Normal);
	    CP_DeclareShapeGetter(cpSegmentShape, cpFloat, Radius);
	    */

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// Check that a set of vertexes is convex and has a clockwise winding.
	    var polyValidate = function polyValidate(verts) {
	        var len = verts.length;
	        for (var i = 0; i < len; i += 2) {
	            var ax = verts[i];
	            var ay = verts[i + 1];
	            var bx = verts[(i + 2) % len];
	            var by = verts[(i + 3) % len];
	            var cx = verts[(i + 4) % len];
	            var cy = verts[(i + 5) % len];

	            //if(vcross(vsub(b, a), vsub(c, b)) > 0){
	            if (vcross2(bx - ax, by - ay, cx - bx, cy - by) > 0) {
	                return false;
	            }
	        }

	        return true;
	    };

	    /// Initialize a polygon shape.
	    /// The vertexes must be convex and have a clockwise winding.
	    var PolyShape = cp.PolyShape = function (body, verts, offset) {
	        this.setVerts(verts, offset);
	        this.type = 'poly';
	        Shape.call(this, body);
	    };

	    PolyShape.prototype = Object.create(Shape.prototype);

	    var SplittingPlane = function SplittingPlane(n, d) {
	        this.n = n;
	        this.d = d;
	    };

	    SplittingPlane.prototype.compare = function (v) {
	        return vdot(this.n, v) - this.d;
	    };

	    PolyShape.prototype.setVerts = function (verts, offset) {
	        assert(verts.length >= 4, "Polygons require some verts");
	        assert(typeof verts[0] === 'number', 'Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])');

	        // Fail if the user attempts to pass a concave poly, or a bad winding.
	        assert(polyValidate(verts), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");

	        var len = verts.length;
	        var numVerts = len >> 1;

	        // This a pretty bad way to do this in javascript. As a first pass, I want to keep
	        // the code similar to the C.
	        this.verts = new Array(len);
	        this.tVerts = new Array(len);
	        this.planes = new Array(numVerts);
	        this.tPlanes = new Array(numVerts);

	        for (var i = 0; i < len; i += 2) {
	            //var a = vadd(offset, verts[i]);
	            //var b = vadd(offset, verts[(i+1)%numVerts]);
	            var ax = verts[i] + offset.x;
	            var ay = verts[i + 1] + offset.y;
	            var bx = verts[(i + 2) % len] + offset.x;
	            var by = verts[(i + 3) % len] + offset.y;

	            // Inefficient, but only called during object initialization.
	            var n = vnormalize(vperp(new Vect(bx - ax, by - ay)));

	            this.verts[i] = ax;
	            this.verts[i + 1] = ay;
	            this.planes[i >> 1] = new SplittingPlane(n, vdot2(n.x, n.y, ax, ay));
	            this.tPlanes[i >> 1] = new SplittingPlane(new Vect(0, 0), 0);
	        }
	    };

	    /// Initialize a box shaped polygon shape.
	    var BoxShape = cp.BoxShape = function (body, width, height) {
	        var hw = width / 2;
	        var hh = height / 2;

	        return BoxShape2(body, new BB(-hw, -hh, hw, hh));
	    };

	    /// Initialize an offset box shaped polygon shape.
	    var BoxShape2 = cp.BoxShape2 = function (body, box) {
	        var verts = [box.l, box.b, box.l, box.t, box.r, box.t, box.r, box.b];

	        return new PolyShape(body, verts, vzero);
	    };

	    PolyShape.prototype.transformVerts = function (p, rot) {
	        var src = this.verts;
	        var dst = this.tVerts;

	        var l = Infinity,
	            r = -Infinity;
	        var b = Infinity,
	            t = -Infinity;

	        for (var i = 0; i < src.length; i += 2) {
	            //var v = vadd(p, vrotate(src[i], rot));
	            var x = src[i];
	            var y = src[i + 1];

	            var vx = p.x + x * rot.x - y * rot.y;
	            var vy = p.y + x * rot.y + y * rot.x;

	            //console.log('(' + x + ',' + y + ') -> (' + vx + ',' + vy + ')');

	            dst[i] = vx;
	            dst[i + 1] = vy;

	            l = min(l, vx);
	            r = max(r, vx);
	            b = min(b, vy);
	            t = max(t, vy);
	        }

	        this.bb_l = l;
	        this.bb_b = b;
	        this.bb_r = r;
	        this.bb_t = t;
	    };

	    PolyShape.prototype.transformAxes = function (p, rot) {
	        var src = this.planes;
	        var dst = this.tPlanes;

	        for (var i = 0; i < src.length; i++) {
	            var n = vrotate(src[i].n, rot);
	            dst[i].n = n;
	            dst[i].d = vdot(p, n) + src[i].d;
	        }
	    };

	    PolyShape.prototype.cacheData = function (p, rot) {
	        this.transformAxes(p, rot);
	        this.transformVerts(p, rot);
	    };

	    PolyShape.prototype.nearestPointQuery = function (p) {
	        var planes = this.tPlanes;
	        var verts = this.tVerts;

	        var v0x = verts[verts.length - 2];
	        var v0y = verts[verts.length - 1];
	        var minDist = Infinity;
	        var closestPoint = vzero;
	        var outside = false;

	        for (var i = 0; i < planes.length; i++) {
	            if (planes[i].compare(p) > 0) outside = true;

	            var v1x = verts[i * 2];
	            var v1y = verts[i * 2 + 1];
	            var closest = closestPointOnSegment2(p.x, p.y, v0x, v0y, v1x, v1y);

	            var dist = vdist(p, closest);
	            if (dist < minDist) {
	                minDist = dist;
	                closestPoint = closest;
	            }

	            v0x = v1x;
	            v0y = v1y;
	        }

	        return new NearestPointQueryInfo(this, closestPoint, outside ? minDist : -minDist);
	    };

	    PolyShape.prototype.segmentQuery = function (a, b) {
	        var axes = this.tPlanes;
	        var verts = this.tVerts;
	        var numVerts = axes.length;
	        var len = numVerts * 2;

	        for (var i = 0; i < numVerts; i++) {
	            var n = axes[i].n;
	            var an = vdot(a, n);
	            if (axes[i].d > an) continue;

	            var bn = vdot(b, n);
	            var t = (axes[i].d - an) / (bn - an);
	            if (t < 0 || 1 < t) continue;

	            var point = vlerp(a, b, t);
	            var dt = -vcross(n, point);
	            var dtMin = -vcross2(n.x, n.y, verts[i * 2], verts[i * 2 + 1]);
	            var dtMax = -vcross2(n.x, n.y, verts[(i * 2 + 2) % len], verts[(i * 2 + 3) % len]);

	            if (dtMin <= dt && dt <= dtMax) {
	                // josephg: In the original C code, this function keeps
	                // looping through axes after finding a match. I *think*
	                // this code is equivalent...
	                return new SegmentQueryInfo(this, t, n);
	            }
	        }
	    };

	    PolyShape.prototype.valueOnAxis = function (n, d) {
	        var verts = this.tVerts;
	        var m = vdot2(n.x, n.y, verts[0], verts[1]);

	        for (var i = 2; i < verts.length; i += 2) {
	            m = min(m, vdot2(n.x, n.y, verts[i], verts[i + 1]));
	        }

	        return m - d;
	    };

	    PolyShape.prototype.containsVert = function (vx, vy) {
	        var planes = this.tPlanes;

	        for (var i = 0; i < planes.length; i++) {
	            var n = planes[i].n;
	            var dist = vdot2(n.x, n.y, vx, vy) - planes[i].d;
	            if (dist > 0) return false;
	        }

	        return true;
	    };

	    PolyShape.prototype.containsVertPartial = function (vx, vy, n) {
	        var planes = this.tPlanes;

	        for (var i = 0; i < planes.length; i++) {
	            var n2 = planes[i].n;
	            if (vdot(n2, n) < 0) continue;
	            var dist = vdot2(n2.x, n2.y, vx, vy) - planes[i].d;
	            if (dist > 0) return false;
	        }

	        return true;
	    };

	    // These methods are provided for API compatibility with Chipmunk. I recommend against using
	    // them - just access the poly.verts list directly.
	    PolyShape.prototype.getNumVerts = function () {
	        return this.verts.length / 2;
	    };
	    PolyShape.prototype.getVert = function (i) {
	        return new Vect(this.verts[i * 2], this.verts[i * 2 + 1]);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// @defgroup cpBody cpBody
	    /// Chipmunk's rigid body type. Rigid bodies hold the physical properties of an object like
	    /// it's mass, and position and velocity of it's center of gravity. They don't have an shape on their own.
	    /// They are given a shape by creating collision shapes (cpShape) that point to the body.
	    /// @{

	    var Body = cp.Body = function (m, i) {
	        /// Mass of the body.
	        /// Must agree with cpBody.m_inv! Use body.setMass() when changing the mass for this reason.
	        //this.m;
	        /// Mass inverse.
	        //this.m_inv;

	        /// Moment of inertia of the body.
	        /// Must agree with cpBody.i_inv! Use body.setMoment() when changing the moment for this reason.
	        //this.i;
	        /// Moment of inertia inverse.
	        //this.i_inv;

	        /// Position of the rigid body's center of gravity.
	        this.p = new Vect(0, 0);
	        /// Velocity of the rigid body's center of gravity.
	        this.vx = this.vy = 0;
	        /// Force acting on the rigid body's center of gravity.
	        this.f = new Vect(0, 0);

	        /// Rotation of the body around it's center of gravity in radians.
	        /// Must agree with cpBody.rot! Use cpBodySetAngle() when changing the angle for this reason.
	        //this.a;
	        /// Angular velocity of the body around it's center of gravity in radians/second.
	        this.w = 0;
	        /// Torque applied to the body around it's center of gravity.
	        this.t = 0;

	        /// Cached unit length vector representing the angle of the body.
	        /// Used for fast rotations using cpvrotate().
	        //cpVect rot;

	        /// Maximum velocity allowed when updating the velocity.
	        this.v_limit = Infinity;
	        /// Maximum rotational rate (in radians/second) allowed when updating the angular velocity.
	        this.w_limit = Infinity;

	        // This stuff is all private.
	        this.v_biasx = this.v_biasy = 0;
	        this.w_bias = 0;

	        this.space = null;

	        this.shapeList = [];
	        this.arbiterList = null; // These are both wacky linked lists.
	        this.constraintList = null;

	        // This stuff is used to track information on the collision graph.
	        this.nodeRoot = null;
	        this.nodeNext = null;
	        this.nodeIdleTime = 0;

	        // Set this.m and this.m_inv
	        this.setMass(m);

	        // Set this.i and this.i_inv
	        this.setMoment(i);

	        // Set this.a and this.rot
	        this.rot = new Vect(0, 0);
	        this.setAngle(0);
	    };

	    // I wonder if this should use the constructor style like Body...
	    var createStaticBody = function createStaticBody() {
	        var body = new Body(Infinity, Infinity);
	        body.nodeIdleTime = Infinity;

	        return body;
	    };

	    if (false) {
	        var v_assert_nan = function v_assert_nan(v, message) {
	            assert(v.x == v.x && v.y == v.y, message);
	        };
	        var v_assert_infinite = function v_assert_infinite(v, message) {
	            assert(Math.abs(v.x) !== Infinity && Math.abs(v.y) !== Infinity, message);
	        };
	        var v_assert_sane = function v_assert_sane(v, message) {
	            v_assert_nan(v, message);v_assert_infinite(v, message);
	        };

	        Body.prototype.sanityCheck = function () {
	            assert(this.m === this.m && this.m_inv === this.m_inv, "Body's mass is invalid.");
	            assert(this.i === this.i && this.i_inv === this.i_inv, "Body's moment is invalid.");

	            v_assert_sane(this.p, "Body's position is invalid.");
	            v_assert_sane(this.f, "Body's force is invalid.");
	            assert(this.vx === this.vx && Math.abs(this.vx) !== Infinity, "Body's velocity is invalid.");
	            assert(this.vy === this.vy && Math.abs(this.vy) !== Infinity, "Body's velocity is invalid.");

	            assert(this.a === this.a && Math.abs(this.a) !== Infinity, "Body's angle is invalid.");
	            assert(this.w === this.w && Math.abs(this.w) !== Infinity, "Body's angular velocity is invalid.");
	            assert(this.t === this.t && Math.abs(this.t) !== Infinity, "Body's torque is invalid.");

	            v_assert_sane(this.rot, "Body's rotation vector is invalid.");

	            assert(this.v_limit === this.v_limit, "Body's velocity limit is invalid.");
	            assert(this.w_limit === this.w_limit, "Body's angular velocity limit is invalid.");
	        };
	    } else {
	        Body.prototype.sanityCheck = function () {};
	    }

	    Body.prototype.getPos = function () {
	        return this.p;
	    };
	    Body.prototype.getVel = function () {
	        return new Vect(this.vx, this.vy);
	    };
	    Body.prototype.getAngVel = function () {
	        return this.w;
	    };

	    /// Returns true if the body is sleeping.
	    Body.prototype.isSleeping = function () {
	        return this.nodeRoot !== null;
	    };

	    /// Returns true if the body is static.
	    Body.prototype.isStatic = function () {
	        return this.nodeIdleTime === Infinity;
	    };

	    /// Returns true if the body has not been added to a space.
	    Body.prototype.isRogue = function () {
	        return this.space === null;
	    };

	    // It would be nicer to use defineProperty for this, but its about 30x slower:
	    // http://jsperf.com/defineproperty-vs-setter
	    Body.prototype.setMass = function (mass) {
	        assert(mass > 0, "Mass must be positive and non-zero.");

	        //activate is defined in cpSpaceComponent
	        this.activate();
	        this.m = mass;
	        this.m_inv = 1 / mass;
	    };

	    Body.prototype.setMoment = function (moment) {
	        assert(moment > 0, "Moment of Inertia must be positive and non-zero.");

	        this.activate();
	        this.i = moment;
	        this.i_inv = 1 / moment;
	    };

	    Body.prototype.addShape = function (shape) {
	        this.shapeList.push(shape);
	    };

	    Body.prototype.removeShape = function (shape) {
	        // This implementation has a linear time complexity with the number of shapes.
	        // The original implementation used linked lists instead, which might be faster if
	        // you're constantly editing the shape of a body. I expect most bodies will never
	        // have their shape edited, so I'm just going to use the simplest possible implemention.
	        deleteObjFromList(this.shapeList, shape);
	    };

	    var filterConstraints = function filterConstraints(node, body, filter) {
	        if (node === filter) {
	            return node.next(body);
	        } else if (node.a === body) {
	            node.next_a = filterConstraints(node.next_a, body, filter);
	        } else {
	            node.next_b = filterConstraints(node.next_b, body, filter);
	        }

	        return node;
	    };

	    Body.prototype.removeConstraint = function (constraint) {
	        // The constraint must be in the constraints list when this is called.
	        this.constraintList = filterConstraints(this.constraintList, this, constraint);
	    };

	    Body.prototype.setPos = function (pos) {
	        this.activate();
	        this.sanityCheck();
	        // If I allow the position to be set to vzero, vzero will get changed.
	        if (pos === vzero) {
	            pos = cp.v(0, 0);
	        }
	        this.p = pos;
	    };

	    Body.prototype.setVel = function (velocity) {
	        this.activate();
	        this.vx = velocity.x;
	        this.vy = velocity.y;
	    };

	    Body.prototype.setAngVel = function (w) {
	        this.activate();
	        this.w = w;
	    };

	    Body.prototype.setAngleInternal = function (angle) {
	        assert(!isNaN(angle), "Internal Error: Attempting to set body's angle to NaN");
	        this.a = angle; //fmod(a, (cpFloat)M_PI*2.0f);

	        //this.rot = vforangle(angle);
	        this.rot.x = Math.cos(angle);
	        this.rot.y = Math.sin(angle);
	    };

	    Body.prototype.setAngle = function (angle) {
	        this.activate();
	        this.sanityCheck();
	        this.setAngleInternal(angle);
	    };

	    Body.prototype.velocity_func = function (gravity, damping, dt) {
	        //this.v = vclamp(vadd(vmult(this.v, damping), vmult(vadd(gravity, vmult(this.f, this.m_inv)), dt)), this.v_limit);
	        var vx = this.vx * damping + (gravity.x + this.f.x * this.m_inv) * dt;
	        var vy = this.vy * damping + (gravity.y + this.f.y * this.m_inv) * dt;

	        //var v = vclamp(new Vect(vx, vy), this.v_limit);
	        //this.vx = v.x; this.vy = v.y;
	        var v_limit = this.v_limit;
	        var lensq = vx * vx + vy * vy;
	        var scale = lensq > v_limit * v_limit ? v_limit / Math.sqrt(lensq) : 1;
	        this.vx = vx * scale;
	        this.vy = vy * scale;

	        var w_limit = this.w_limit;
	        this.w = clamp(this.w * damping + this.t * this.i_inv * dt, -w_limit, w_limit);

	        this.sanityCheck();
	    };

	    Body.prototype.position_func = function (dt) {
	        //this.p = vadd(this.p, vmult(vadd(this.v, this.v_bias), dt));

	        //this.p = this.p + (this.v + this.v_bias) * dt;
	        this.p.x += (this.vx + this.v_biasx) * dt;
	        this.p.y += (this.vy + this.v_biasy) * dt;

	        this.setAngleInternal(this.a + (this.w + this.w_bias) * dt);

	        this.v_biasx = this.v_biasy = 0;
	        this.w_bias = 0;

	        this.sanityCheck();
	    };

	    Body.prototype.resetForces = function () {
	        this.activate();
	        this.f = new Vect(0, 0);
	        this.t = 0;
	    };

	    Body.prototype.applyForce = function (force, r) {
	        this.activate();
	        this.f = vadd(this.f, force);
	        this.t += vcross(r, force);
	    };

	    Body.prototype.applyImpulse = function (j, r) {
	        this.activate();
	        apply_impulse(this, j.x, j.y, r);
	    };

	    Body.prototype.getVelAtPoint = function (r) {
	        return vadd(new Vect(this.vx, this.vy), vmult(vperp(r), this.w));
	    };

	    /// Get the velocity on a body (in world units) at a point on the body in world coordinates.
	    Body.prototype.getVelAtWorldPoint = function (point) {
	        return this.getVelAtPoint(vsub(point, this.p));
	    };

	    /// Get the velocity on a body (in world units) at a point on the body in local coordinates.
	    Body.prototype.getVelAtLocalPoint = function (point) {
	        return this.getVelAtPoint(vrotate(point, this.rot));
	    };

	    Body.prototype.eachShape = function (func) {
	        for (var i = 0, len = this.shapeList.length; i < len; i++) {
	            func(this.shapeList[i]);
	        }
	    };

	    Body.prototype.eachConstraint = function (func) {
	        var constraint = this.constraintList;
	        while (constraint) {
	            var next = constraint.next(this);
	            func(constraint);
	            constraint = next;
	        }
	    };

	    Body.prototype.eachArbiter = function (func) {
	        var arb = this.arbiterList;
	        while (arb) {
	            var next = arb.next(this);

	            arb.swappedColl = this === arb.body_b;
	            func(arb);

	            arb = next;
	        }
	    };

	    /// Convert body relative/local coordinates to absolute/world coordinates.
	    Body.prototype.local2World = function (v) {
	        return vadd(this.p, vrotate(v, this.rot));
	    };

	    /// Convert body absolute/world coordinates to  relative/local coordinates.
	    Body.prototype.world2Local = function (v) {
	        return vunrotate(vsub(v, this.p), this.rot);
	    };

	    /// Get the kinetic energy of a body.
	    Body.prototype.kineticEnergy = function () {
	        // Need to do some fudging to avoid NaNs
	        var vsq = this.vx * this.vx + this.vy * this.vy;
	        var wsq = this.w * this.w;
	        return (vsq ? vsq * this.m : 0) + (wsq ? wsq * this.i : 0);
	    };

	    /* Copyright (c) 2010 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /**
	        @defgroup cpSpatialIndex cpSpatialIndex
	    
	        Spatial indexes are data structures that are used to accelerate collision detection
	        and spatial queries. Chipmunk provides a number of spatial index algorithms to pick from
	        and they are programmed in a generic way so that you can use them for holding more than
	        just Shapes.
	    
	        It works by using pointers to the objects you add and using a callback to ask your code
	        for bounding boxes when it needs them. Several types of queries can be performed an index as well
	        as reindexing and full collision information. All communication to the spatial indexes is performed
	        through callback functions.
	    
	        Spatial indexes should be treated as opaque structs.
	        This means you shouldn't be reading any of the fields directly.
	    
	        All spatial indexes define the following methods:
	    
	        // The number of objects in the spatial index.
	        count = 0;
	    
	        // Iterate the objects in the spatial index. @c func will be called once for each object.
	        each(func);
	    
	        // Returns true if the spatial index contains the given object.
	        // Most spatial indexes use hashed storage, so you must provide a hash value too.
	        contains(obj, hashid);
	    
	        // Add an object to a spatial index.
	        insert(obj, hashid);
	    
	        // Remove an object from a spatial index.
	        remove(obj, hashid);
	    
	        // Perform a full reindex of a spatial index.
	        reindex();
	    
	        // Reindex a single object in the spatial index.
	        reindexObject(obj, hashid);
	    
	        // Perform a point query against the spatial index, calling @c func for each potential match.
	        // A pointer to the point will be passed as @c obj1 of @c func.
	        // func(shape);
	        pointQuery(point, func);
	    
	        // Perform a segment query against the spatial index, calling @c func for each potential match.
	        // func(shape);
	        segmentQuery(vect a, vect b, t_exit, func);
	    
	        // Perform a rectangle query against the spatial index, calling @c func for each potential match.
	        // func(shape);
	        query(bb, func);
	    
	        // Simultaneously reindex and find all colliding objects.
	        // @c func will be called once for each potentially overlapping pair of objects found.
	        // If the spatial index was initialized with a static index, it will collide it's objects against that as well.
	        reindexQuery(func);
	    */

	    var SpatialIndex = cp.SpatialIndex = function (staticIndex) {
	        this.staticIndex = staticIndex;

	        if (staticIndex) {
	            if (staticIndex.dynamicIndex) {
	                throw new Error("This static index is already associated with a dynamic index.");
	            }
	            staticIndex.dynamicIndex = this;
	        }
	    };

	    // Collide the objects in an index against the objects in a staticIndex using the query callback function.
	    SpatialIndex.prototype.collideStatic = function (staticIndex, func) {
	        if (staticIndex.count > 0) {
	            var query = staticIndex.query;

	            this.each(function (obj) {
	                // origin chipmunk
	                // query(obj, new BB(obj.bb_l, obj.bb_b, obj.bb_r, obj.bb_t), func);
	                // chenzhuo04-bugfix and https://github.com/josephg/Chipmunk-js/pull/34/files
	                query.call(obj, new BB(obj.bb_l, obj.bb_b, obj.bb_r, obj.bb_t), func);
	            });
	        }
	    };

	    /* Copyright (c) 2009 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // This file implements a modified AABB tree for collision detection.

	    var BBTree = cp.BBTree = function (staticIndex) {
	        SpatialIndex.call(this, staticIndex);

	        this.velocityFunc = null;

	        // This is a hash from object ID -> object for the objects stored in the BBTree.
	        this.leaves = {};
	        // A count of the number of leaves in the BBTree.
	        this.count = 0;

	        this.root = null;

	        // A linked list containing an object pool of tree nodes and pairs.
	        this.pooledNodes = null;
	        this.pooledPairs = null;

	        this.stamp = 0;
	    };

	    BBTree.prototype = Object.create(SpatialIndex.prototype);

	    var numNodes = 0;

	    var Node = function Node(tree, a, b) {
	        this.obj = null;
	        this.bb_l = min(a.bb_l, b.bb_l);
	        this.bb_b = min(a.bb_b, b.bb_b);
	        this.bb_r = max(a.bb_r, b.bb_r);
	        this.bb_t = max(a.bb_t, b.bb_t);
	        this.parent = null;

	        this.setA(a);
	        this.setB(b);
	    };

	    BBTree.prototype.makeNode = function (a, b) {
	        var node = this.pooledNodes;
	        if (node) {
	            this.pooledNodes = node.parent;
	            node.constructor(this, a, b);
	            return node;
	        } else {
	            numNodes++;
	            return new Node(this, a, b);
	        }
	    };

	    var numLeaves = 0;
	    var Leaf = function Leaf(tree, obj) {
	        this.obj = obj;
	        tree.getBB(obj, this);

	        this.parent = null;

	        this.stamp = 1;
	        this.pairs = null;
	        numLeaves++;
	    };

	    // **** Misc Functions

	    BBTree.prototype.getBB = function (obj, dest) {
	        var velocityFunc = this.velocityFunc;
	        if (velocityFunc) {
	            var coef = 0.1;
	            var x = (obj.bb_r - obj.bb_l) * coef;
	            var y = (obj.bb_t - obj.bb_b) * coef;

	            var v = vmult(velocityFunc(obj), 0.1);

	            dest.bb_l = obj.bb_l + min(-x, v.x);
	            dest.bb_b = obj.bb_b + min(-y, v.y);
	            dest.bb_r = obj.bb_r + max(x, v.x);
	            dest.bb_t = obj.bb_t + max(y, v.y);
	        } else {
	            dest.bb_l = obj.bb_l;
	            dest.bb_b = obj.bb_b;
	            dest.bb_r = obj.bb_r;
	            dest.bb_t = obj.bb_t;
	        }
	    };

	    BBTree.prototype.getStamp = function () {
	        var dynamic = this.dynamicIndex;
	        return dynamic && dynamic.stamp ? dynamic.stamp : this.stamp;
	    };

	    BBTree.prototype.incrementStamp = function () {
	        if (this.dynamicIndex && this.dynamicIndex.stamp) {
	            this.dynamicIndex.stamp++;
	        } else {
	            this.stamp++;
	        }
	    };

	    // **** Pair/Thread Functions

	    var numPairs = 0;
	    // Objects created with constructors are faster than object literals. :(
	    var Pair = function Pair(leafA, nextA, leafB, nextB) {
	        this.prevA = null;
	        this.leafA = leafA;
	        this.nextA = nextA;

	        this.prevB = null;
	        this.leafB = leafB;
	        this.nextB = nextB;
	    };

	    BBTree.prototype.makePair = function (leafA, nextA, leafB, nextB) {
	        //return new Pair(leafA, nextA, leafB, nextB);
	        var pair = this.pooledPairs;
	        if (pair) {
	            this.pooledPairs = pair.prevA;

	            pair.prevA = null;
	            pair.leafA = leafA;
	            pair.nextA = nextA;

	            pair.prevB = null;
	            pair.leafB = leafB;
	            pair.nextB = nextB;

	            //pair.constructor(leafA, nextA, leafB, nextB);
	            return pair;
	        } else {
	            numPairs++;
	            return new Pair(leafA, nextA, leafB, nextB);
	        }
	    };

	    Pair.prototype.recycle = function (tree) {
	        this.prevA = tree.pooledPairs;
	        tree.pooledPairs = this;
	    };

	    var unlinkThread = function unlinkThread(prev, leaf, next) {
	        if (next) {
	            if (next.leafA === leaf) next.prevA = prev;else next.prevB = prev;
	        }

	        if (prev) {
	            if (prev.leafA === leaf) prev.nextA = next;else prev.nextB = next;
	        } else {
	            leaf.pairs = next;
	        }
	    };

	    Leaf.prototype.clearPairs = function (tree) {
	        var pair = this.pairs,
	            next;

	        this.pairs = null;

	        while (pair) {
	            if (pair.leafA === this) {
	                next = pair.nextA;
	                unlinkThread(pair.prevB, pair.leafB, pair.nextB);
	            } else {
	                next = pair.nextB;
	                unlinkThread(pair.prevA, pair.leafA, pair.nextA);
	            }
	            pair.recycle(tree);
	            pair = next;
	        }
	    };

	    var pairInsert = function pairInsert(a, b, tree) {
	        var nextA = a.pairs,
	            nextB = b.pairs;
	        var pair = tree.makePair(a, nextA, b, nextB);
	        a.pairs = b.pairs = pair;

	        if (nextA) {
	            if (nextA.leafA === a) nextA.prevA = pair;else nextA.prevB = pair;
	        }

	        if (nextB) {
	            if (nextB.leafA === b) nextB.prevA = pair;else nextB.prevB = pair;
	        }
	    };

	    // **** Node Functions

	    Node.prototype.recycle = function (tree) {
	        this.parent = tree.pooledNodes;
	        tree.pooledNodes = this;
	    };

	    Leaf.prototype.recycle = function (tree) {
	        // Its not worth the overhead to recycle leaves.
	    };

	    Node.prototype.setA = function (value) {
	        this.A = value;
	        value.parent = this;
	    };

	    Node.prototype.setB = function (value) {
	        this.B = value;
	        value.parent = this;
	    };

	    Leaf.prototype.isLeaf = true;
	    Node.prototype.isLeaf = false;

	    Node.prototype.otherChild = function (child) {
	        return this.A == child ? this.B : this.A;
	    };

	    Node.prototype.replaceChild = function (child, value, tree) {
	        assertSoft(child == this.A || child == this.B, "Node is not a child of parent.");

	        if (this.A == child) {
	            this.A.recycle(tree);
	            this.setA(value);
	        } else {
	            this.B.recycle(tree);
	            this.setB(value);
	        }

	        for (var node = this; node; node = node.parent) {
	            //node.bb = bbMerge(node.A.bb, node.B.bb);
	            var a = node.A;
	            var b = node.B;
	            node.bb_l = min(a.bb_l, b.bb_l);
	            node.bb_b = min(a.bb_b, b.bb_b);
	            node.bb_r = max(a.bb_r, b.bb_r);
	            node.bb_t = max(a.bb_t, b.bb_t);
	        }
	    };

	    Node.prototype.bbArea = Leaf.prototype.bbArea = function () {
	        return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b);
	    };

	    var bbTreeMergedArea = function bbTreeMergedArea(a, b) {
	        return (max(a.bb_r, b.bb_r) - min(a.bb_l, b.bb_l)) * (max(a.bb_t, b.bb_t) - min(a.bb_b, b.bb_b));
	    };

	    // **** Subtree Functions

	    // Would it be better to make these functions instance methods on Node and Leaf?

	    var bbProximity = function bbProximity(a, b) {
	        return Math.abs(a.bb_l + a.bb_r - b.bb_l - b.bb_r) + Math.abs(a.bb_b + a.bb_t - b.bb_b - b.bb_t);
	    };

	    var subtreeInsert = function subtreeInsert(subtree, leaf, tree) {
	        //  var s = new Error().stack;
	        //  traces[s] = traces[s] ? traces[s]+1 : 1;

	        if (subtree == null) {
	            return leaf;
	        } else if (subtree.isLeaf) {
	            return tree.makeNode(leaf, subtree);
	        } else {
	            var cost_a = subtree.B.bbArea() + bbTreeMergedArea(subtree.A, leaf);
	            var cost_b = subtree.A.bbArea() + bbTreeMergedArea(subtree.B, leaf);

	            if (cost_a === cost_b) {
	                cost_a = bbProximity(subtree.A, leaf);
	                cost_b = bbProximity(subtree.B, leaf);
	            }

	            if (cost_b < cost_a) {
	                subtree.setB(subtreeInsert(subtree.B, leaf, tree));
	            } else {
	                subtree.setA(subtreeInsert(subtree.A, leaf, tree));
	            }

	            //      subtree.bb = bbMerge(subtree.bb, leaf.bb);
	            subtree.bb_l = min(subtree.bb_l, leaf.bb_l);
	            subtree.bb_b = min(subtree.bb_b, leaf.bb_b);
	            subtree.bb_r = max(subtree.bb_r, leaf.bb_r);
	            subtree.bb_t = max(subtree.bb_t, leaf.bb_t);

	            return subtree;
	        }
	    };

	    Node.prototype.intersectsBB = Leaf.prototype.intersectsBB = function (bb) {
	        return this.bb_l <= bb.r && bb.l <= this.bb_r && this.bb_b <= bb.t && bb.b <= this.bb_t;
	    };

	    var subtreeQuery = function subtreeQuery(subtree, bb, func) {
	        //if(bbIntersectsBB(subtree.bb, bb)){
	        if (subtree.intersectsBB(bb)) {
	            if (subtree.isLeaf) {
	                func(subtree.obj);
	            } else {
	                subtreeQuery(subtree.A, bb, func);
	                subtreeQuery(subtree.B, bb, func);
	            }
	        }
	    };

	    /// Returns the fraction along the segment query the node hits. Returns Infinity if it doesn't hit.
	    var nodeSegmentQuery = function nodeSegmentQuery(node, a, b) {
	        var idx = 1 / (b.x - a.x);
	        var tx1 = node.bb_l == a.x ? -Infinity : (node.bb_l - a.x) * idx;
	        var tx2 = node.bb_r == a.x ? Infinity : (node.bb_r - a.x) * idx;
	        var txmin = min(tx1, tx2);
	        var txmax = max(tx1, tx2);

	        var idy = 1 / (b.y - a.y);
	        var ty1 = node.bb_b == a.y ? -Infinity : (node.bb_b - a.y) * idy;
	        var ty2 = node.bb_t == a.y ? Infinity : (node.bb_t - a.y) * idy;
	        var tymin = min(ty1, ty2);
	        var tymax = max(ty1, ty2);

	        if (tymin <= txmax && txmin <= tymax) {
	            var min_ = max(txmin, tymin);
	            var max_ = min(txmax, tymax);

	            if (0.0 <= max_ && min_ <= 1.0) return max(min_, 0.0);
	        }

	        return Infinity;
	    };

	    var subtreeSegmentQuery = function subtreeSegmentQuery(subtree, a, b, t_exit, func) {
	        if (subtree.isLeaf) {
	            return func(subtree.obj);
	        } else {
	            var t_a = nodeSegmentQuery(subtree.A, a, b);
	            var t_b = nodeSegmentQuery(subtree.B, a, b);

	            if (t_a < t_b) {
	                if (t_a < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
	                if (t_b < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
	            } else {
	                if (t_b < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.B, a, b, t_exit, func));
	                if (t_a < t_exit) t_exit = min(t_exit, subtreeSegmentQuery(subtree.A, a, b, t_exit, func));
	            }

	            return t_exit;
	        }
	    };

	    BBTree.prototype.subtreeRecycle = function (node) {
	        if (node.isLeaf) {
	            this.subtreeRecycle(node.A);
	            this.subtreeRecycle(node.B);
	            node.recycle(this);
	        }
	    };

	    var subtreeRemove = function subtreeRemove(subtree, leaf, tree) {
	        if (leaf == subtree) {
	            return null;
	        } else {
	            var parent = leaf.parent;
	            if (parent == subtree) {
	                var other = subtree.otherChild(leaf);
	                other.parent = subtree.parent;
	                subtree.recycle(tree);
	                return other;
	            } else {
	                parent.parent.replaceChild(parent, parent.otherChild(leaf), tree);
	                return subtree;
	            }
	        }
	    };

	    // **** Marking Functions

	    /*
	    typedef struct MarkContext {
	        bbTree *tree;
	        Node *staticRoot;
	        cpSpatialIndexQueryFunc func;
	    } MarkContext;
	    */

	    var bbTreeIntersectsNode = function bbTreeIntersectsNode(a, b) {
	        return a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t;
	    };

	    Leaf.prototype.markLeafQuery = function (leaf, left, tree, func) {
	        if (bbTreeIntersectsNode(leaf, this)) {
	            if (left) {
	                pairInsert(leaf, this, tree);
	            } else {
	                if (this.stamp < leaf.stamp) pairInsert(this, leaf, tree);
	                if (func) func(leaf.obj, this.obj);
	            }
	        }
	    };

	    Node.prototype.markLeafQuery = function (leaf, left, tree, func) {
	        if (bbTreeIntersectsNode(leaf, this)) {
	            this.A.markLeafQuery(leaf, left, tree, func);
	            this.B.markLeafQuery(leaf, left, tree, func);
	        }
	    };

	    Leaf.prototype.markSubtree = function (tree, staticRoot, func) {
	        if (this.stamp == tree.getStamp()) {
	            if (staticRoot) staticRoot.markLeafQuery(this, false, tree, func);

	            for (var node = this; node.parent; node = node.parent) {
	                if (node == node.parent.A) {
	                    node.parent.B.markLeafQuery(this, true, tree, func);
	                } else {
	                    node.parent.A.markLeafQuery(this, false, tree, func);
	                }
	            }
	        } else {
	            var pair = this.pairs;
	            while (pair) {
	                if (this === pair.leafB) {
	                    if (func) func(pair.leafA.obj, this.obj);
	                    pair = pair.nextB;
	                } else {
	                    pair = pair.nextA;
	                }
	            }
	        }
	    };

	    Node.prototype.markSubtree = function (tree, staticRoot, func) {
	        this.A.markSubtree(tree, staticRoot, func);
	        this.B.markSubtree(tree, staticRoot, func);
	    };

	    // **** Leaf Functions

	    Leaf.prototype.containsObj = function (obj) {
	        return this.bb_l <= obj.bb_l && this.bb_r >= obj.bb_r && this.bb_b <= obj.bb_b && this.bb_t >= obj.bb_t;
	    };

	    Leaf.prototype.update = function (tree) {
	        var root = tree.root;
	        var obj = this.obj;

	        //if(!bbContainsBB(this.bb, bb)){
	        if (!this.containsObj(obj)) {
	            tree.getBB(this.obj, this);

	            root = subtreeRemove(root, this, tree);
	            tree.root = subtreeInsert(root, this, tree);

	            this.clearPairs(tree);
	            this.stamp = tree.getStamp();

	            return true;
	        }

	        return false;
	    };

	    Leaf.prototype.addPairs = function (tree) {
	        var dynamicIndex = tree.dynamicIndex;
	        if (dynamicIndex) {
	            var dynamicRoot = dynamicIndex.root;
	            if (dynamicRoot) {
	                dynamicRoot.markLeafQuery(this, true, dynamicIndex, null);
	            }
	        } else {
	            var staticRoot = tree.staticIndex.root;
	            this.markSubtree(tree, staticRoot, null);
	        }
	    };

	    // **** Insert/Remove

	    BBTree.prototype.insert = function (obj, hashid) {
	        var leaf = new Leaf(this, obj);

	        this.leaves[hashid] = leaf;
	        this.root = subtreeInsert(this.root, leaf, this);
	        this.count++;

	        leaf.stamp = this.getStamp();
	        leaf.addPairs(this);
	        this.incrementStamp();
	    };

	    BBTree.prototype.remove = function (obj, hashid) {
	        var leaf = this.leaves[hashid];

	        delete this.leaves[hashid];
	        this.root = subtreeRemove(this.root, leaf, this);
	        this.count--;

	        leaf.clearPairs(this);
	        leaf.recycle(this);
	    };

	    BBTree.prototype.contains = function (obj, hashid) {
	        return this.leaves[hashid] != null;
	    };

	    // **** Reindex
	    var voidQueryFunc = function voidQueryFunc(obj1, obj2) {};

	    BBTree.prototype.reindexQuery = function (func) {
	        if (!this.root) return;

	        // LeafUpdate() may modify this.root. Don't cache it.
	        var hashid,
	            leaves = this.leaves;
	        for (hashid in leaves) {
	            leaves[hashid].update(this);
	        }

	        var staticIndex = this.staticIndex;
	        var staticRoot = staticIndex && staticIndex.root;

	        this.root.markSubtree(this, staticRoot, func);
	        if (staticIndex && !staticRoot) this.collideStatic(this, staticIndex, func);

	        this.incrementStamp();
	    };

	    BBTree.prototype.reindex = function () {
	        this.reindexQuery(voidQueryFunc);
	    };

	    BBTree.prototype.reindexObject = function (obj, hashid) {
	        var leaf = this.leaves[hashid];
	        if (leaf) {
	            if (leaf.update(this)) leaf.addPairs(this);
	            this.incrementStamp();
	        }
	    };

	    // **** Query

	    // This has since been removed from upstream Chipmunk - which recommends you just use query() below
	    // directly.
	    BBTree.prototype.pointQuery = function (point, func) {
	        this.query(new BB(point.x, point.y, point.x, point.y), func);
	    };

	    BBTree.prototype.segmentQuery = function (a, b, t_exit, func) {
	        if (this && this.root) subtreeSegmentQuery(this.root, a, b, t_exit, func);
	    };

	    BBTree.prototype.query = function (bb, func) {
	        if (this.root) subtreeQuery(this.root, bb, func);
	    };

	    // **** Misc

	    BBTree.prototype.count = function () {
	        return this.count;
	    };

	    BBTree.prototype.each = function (func) {
	        var hashid;
	        for (hashid in this.leaves) {
	            func(this.leaves[hashid].obj);
	        }
	    };

	    // **** Tree Optimization

	    var bbTreeMergedArea2 = function bbTreeMergedArea2(node, l, b, r, t) {
	        return (max(node.bb_r, r) - min(node.bb_l, l)) * (max(node.bb_t, t) - min(node.bb_b, b));
	    };

	    var partitionNodes = function partitionNodes(tree, nodes, offset, count) {
	        if (count == 1) {
	            return nodes[offset];
	        } else if (count == 2) {
	            return tree.makeNode(nodes[offset], nodes[offset + 1]);
	        }

	        // Find the AABB for these nodes
	        //var bb = nodes[offset].bb;
	        var node = nodes[offset];
	        var bb_l = node.bb_l,
	            bb_b = node.bb_b,
	            bb_r = node.bb_r,
	            bb_t = node.bb_t;

	        var end = offset + count;
	        for (var i = offset + 1; i < end; i++) {
	            //bb = bbMerge(bb, nodes[i].bb);
	            node = nodes[i];
	            bb_l = min(bb_l, node.bb_l);
	            bb_b = min(bb_b, node.bb_b);
	            bb_r = max(bb_r, node.bb_r);
	            bb_t = max(bb_t, node.bb_t);
	        }

	        // Split it on it's longest axis
	        var splitWidth = bb_r - bb_l > bb_t - bb_b;

	        // Sort the bounds and use the median as the splitting point
	        var bounds = new Array(count * 2);
	        if (splitWidth) {
	            for (var i = offset; i < end; i++) {
	                bounds[2 * i + 0] = nodes[i].bb_l;
	                bounds[2 * i + 1] = nodes[i].bb_r;
	            }
	        } else {
	            for (var i = offset; i < end; i++) {
	                bounds[2 * i + 0] = nodes[i].bb_b;
	                bounds[2 * i + 1] = nodes[i].bb_t;
	            }
	        }

	        bounds.sort(function (a, b) {
	            // This might run faster if the function was moved out into the global scope.
	            return a - b;
	        });
	        var split = (bounds[count - 1] + bounds[count]) * 0.5; // use the median as the split

	        // Generate the child BBs
	        //var a = bb, b = bb;
	        var a_l = bb_l,
	            a_b = bb_b,
	            a_r = bb_r,
	            a_t = bb_t;
	        var b_l = bb_l,
	            b_b = bb_b,
	            b_r = bb_r,
	            b_t = bb_t;

	        if (splitWidth) a_r = b_l = split;else a_t = b_b = split;

	        // Partition the nodes
	        var right = end;
	        for (var left = offset; left < right;) {
	            var node = nodes[left];
	            //  if(bbMergedArea(node.bb, b) < bbMergedArea(node.bb, a)){
	            if (bbTreeMergedArea2(node, b_l, b_b, b_r, b_t) < bbTreeMergedArea2(node, a_l, a_b, a_r, a_t)) {
	                right--;
	                nodes[left] = nodes[right];
	                nodes[right] = node;
	            } else {
	                left++;
	            }
	        }

	        if (right == count) {
	            var node = null;
	            for (var i = offset; i < end; i++) {
	                node = subtreeInsert(node, nodes[i], tree);
	            }return node;
	        }

	        // Recurse and build the node!
	        return NodeNew(tree, partitionNodes(tree, nodes, offset, right - offset), partitionNodes(tree, nodes, right, end - right));
	    };

	    //static void
	    //bbTreeOptimizeIncremental(bbTree *tree, int passes)
	    //{
	    //  for(int i=0; i<passes; i++){
	    //      Node *root = tree.root;
	    //      Node *node = root;
	    //      int bit = 0;
	    //      unsigned int path = tree.opath;
	    //
	    //      while(!NodeIsLeaf(node)){
	    //          node = (path&(1<<bit) ? node.a : node.b);
	    //          bit = (bit + 1)&(sizeof(unsigned int)*8 - 1);
	    //      }
	    //
	    //      root = subtreeRemove(root, node, tree);
	    //      tree.root = subtreeInsert(root, node, tree);
	    //  }
	    //}

	    BBTree.prototype.optimize = function () {
	        var nodes = new Array(this.count);
	        var i = 0;

	        for (var hashid in this.leaves) {
	            nodes[i++] = this.nodes[hashid];
	        }

	        tree.subtreeRecycle(root);
	        this.root = partitionNodes(tree, nodes, nodes.length);
	    };

	    // **** Debug Draw

	    var nodeRender = function nodeRender(node, depth) {
	        if (!node.isLeaf && depth <= 10) {
	            nodeRender(node.A, depth + 1);
	            nodeRender(node.B, depth + 1);
	        }

	        var str = '';
	        for (var i = 0; i < depth; i++) {
	            str += ' ';
	        }

	        console.log(str + node.bb_b + ' ' + node.bb_t);
	    };

	    BBTree.prototype.log = function () {
	        if (this.root) nodeRender(this.root, 0);
	    };

	    /*
	    static void
	    NodeRender(Node *node, int depth)
	    {
	        if(!NodeIsLeaf(node) && depth <= 10){
	            NodeRender(node.a, depth + 1);
	            NodeRender(node.b, depth + 1);
	        }
	    
	        bb bb = node.bb;
	    
	    //  GLfloat v = depth/2.0f;
	    //  glColor3f(1.0f - v, v, 0.0f);
	        glLineWidth(max(5.0f - depth, 1.0f));
	        glBegin(GL_LINES); {
	            glVertex2f(bb.l, bb.b);
	            glVertex2f(bb.l, bb.t);
	    
	            glVertex2f(bb.l, bb.t);
	            glVertex2f(bb.r, bb.t);
	    
	            glVertex2f(bb.r, bb.t);
	            glVertex2f(bb.r, bb.b);
	    
	            glVertex2f(bb.r, bb.b);
	            glVertex2f(bb.l, bb.b);
	        }; glEnd();
	    }
	    
	    void
	    bbTreeRenderDebug(cpSpatialIndex *index){
	        if(index.klass != &klass){
	            cpAssertWarn(false, "Ignoring bbTreeRenderDebug() call to non-tree spatial index.");
	            return;
	        }
	    
	        bbTree *tree = (bbTree *)index;
	        if(tree.root) NodeRender(tree.root, 0);
	    }
	    */
	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// @defgroup cpArbiter cpArbiter
	    /// The cpArbiter struct controls pairs of colliding shapes.
	    /// They are also used in conjuction with collision handler callbacks
	    /// allowing you to retrieve information on the collision and control it.


	    // **** Collision Handlers
	    //
	    // Collision handlers are user-defined objects to describe the behaviour of colliding
	    // objects.
	    var CollisionHandler = cp.CollisionHandler = function () {
	        // The collision type
	        this.a = this.b = 0;
	    };

	    /// Collision begin event callback
	    /// Returning false from a begin callback causes the collision to be ignored until
	    /// the the separate callback is called when the objects stop colliding.
	    CollisionHandler.prototype.begin = function (arb, space) {
	        return true;
	    };

	    /// Collision pre-solve event callback
	    /// Returning false from a pre-step callback causes the collision to be ignored until the next step.
	    CollisionHandler.prototype.preSolve = function (arb, space) {
	        return true;
	    };

	    /// Collision post-solve event function callback type.
	    CollisionHandler.prototype.postSolve = function (arb, space) {};
	    /// Collision separate event function callback type.
	    CollisionHandler.prototype.separate = function (arb, space) {};

	    var CP_MAX_CONTACTS_PER_ARBITER = 4;

	    // Arbiter states
	    //
	    // Arbiter is active and its the first collision.
	    //  'first coll'
	    // Arbiter is active and its not the first collision.
	    //  'normal',
	    // Collision has been explicitly ignored.
	    // Either by returning false from a begin collision handler or calling cpArbiterIgnore().
	    //  'ignore',
	    // Collison is no longer active. A space will cache an arbiter for up to cpSpace.collisionPersistence more steps.
	    //  'cached'

	    /// A colliding pair of shapes.
	    var Arbiter = function Arbiter(a, b) {
	        /// Calculated value to use for the elasticity coefficient.
	        /// Override in a pre-solve collision handler for custom behavior.
	        this.e = 0;
	        /// Calculated value to use for the friction coefficient.
	        /// Override in a pre-solve collision handler for custom behavior.
	        this.u = 0;
	        /// Calculated value to use for applying surface velocities.
	        /// Override in a pre-solve collision handler for custom behavior.
	        this.surface_vr = vzero;

	        this.a = a;this.body_a = a.body;
	        this.b = b;this.body_b = b.body;

	        this.thread_a_next = this.thread_a_prev = null;
	        this.thread_b_next = this.thread_b_prev = null;

	        this.contacts = null;

	        this.stamp = 0;
	        this.handler = null;
	        this.swappedColl = false;
	        this.state = 'first coll';
	    };

	    Arbiter.prototype.getShapes = function () {
	        if (this.swappedColl) {
	            return [this.b, this.a];
	        } else {
	            return [this.a, this.b];
	        }
	    };

	    /// Calculate the total impulse that was applied by this arbiter.
	    /// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
	    Arbiter.prototype.totalImpulse = function () {
	        var contacts = this.contacts;
	        var sum = new Vect(0, 0);

	        for (var i = 0, count = contacts.length; i < count; i++) {
	            var con = contacts[i];
	            sum.add(vmult(con.n, con.jnAcc));
	        }

	        return this.swappedColl ? sum : sum.neg();
	    };

	    /// Calculate the total impulse including the friction that was applied by this arbiter.
	    /// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
	    Arbiter.prototype.totalImpulseWithFriction = function () {
	        var contacts = this.contacts;
	        var sum = new Vect(0, 0);

	        for (var i = 0, count = contacts.length; i < count; i++) {
	            var con = contacts[i];
	            sum.add(new Vect(con.jnAcc, con.jtAcc).rotate(con.n));
	        }

	        return this.swappedColl ? sum : sum.neg();
	    };

	    /// Calculate the amount of energy lost in a collision including static, but not dynamic friction.
	    /// This function should only be called from a post-solve, post-step or cpBodyEachArbiter callback.
	    Arbiter.prototype.totalKE = function () {
	        var eCoef = (1 - this.e) / (1 + this.e);
	        var sum = 0;

	        var contacts = this.contacts;
	        for (var i = 0, count = contacts.length; i < count; i++) {
	            var con = contacts[i];
	            var jnAcc = con.jnAcc;
	            var jtAcc = con.jtAcc;

	            sum += eCoef * jnAcc * jnAcc / con.nMass + jtAcc * jtAcc / con.tMass;
	        }

	        return sum;
	    };

	    /// Causes a collision pair to be ignored as if you returned false from a begin callback.
	    /// If called from a pre-step callback, you will still need to return false
	    /// if you want it to be ignored in the current step.
	    Arbiter.prototype.ignore = function () {
	        this.state = 'ignore';
	    };

	    /// Return the colliding shapes involved for this arbiter.
	    /// The order of their cpSpace.collision_type values will match
	    /// the order set when the collision handler was registered.
	    Arbiter.prototype.getA = function () {
	        return this.swappedColl ? this.b : this.a;
	    };

	    Arbiter.prototype.getB = function () {
	        return this.swappedColl ? this.a : this.b;
	    };

	    /// Returns true if this is the first step a pair of objects started colliding.
	    Arbiter.prototype.isFirstContact = function () {
	        return this.state === 'first coll';
	    };

	    /// A struct that wraps up the important collision data for an arbiter.
	    var ContactPoint = function ContactPoint(point, normal, dist) {
	        this.point = point;
	        this.normal = normal;
	        this.dist = dist;
	    };

	    /// Return a contact set from an arbiter.
	    Arbiter.prototype.getContactPointSet = function () {
	        var set = new Array(this.contacts.length);

	        var i;
	        for (i = 0; i < set.length; i++) {
	            set[i] = new ContactPoint(this.contacts[i].p, this.contacts[i].n, this.contacts[i].dist);
	        }

	        return set;
	    };

	    /// Get the normal of the @c ith contact point.
	    Arbiter.prototype.getNormal = function (i) {
	        var n = this.contacts[i].n;
	        return this.swappedColl ? vneg(n) : n;
	    };

	    /// Get the position of the @c ith contact point.
	    Arbiter.prototype.getPoint = function (i) {
	        return this.contacts[i].p;
	    };

	    /// Get the depth of the @c ith contact point.
	    Arbiter.prototype.getDepth = function (i) {
	        return this.contacts[i].dist;
	    };

	    /*
	    Arbiter.prototype.threadForBody = function(body)
	    {
	        return (this.body_a === body ? this.thread_a : this.thread_b);
	    };*/

	    var unthreadHelper = function unthreadHelper(arb, body, prev, next) {
	        // thread_x_y is quite ugly, but it avoids making unnecessary js objects per arbiter.
	        if (prev) {
	            // cpArbiterThreadForBody(prev, body)->next = next;
	            if (prev.body_a === body) {
	                prev.thread_a_next = next;
	            } else {
	                prev.thread_b_next = next;
	            }
	            // origin chipmunk
	            // } else {
	            // chenzhuo04:
	            // https://github.com/josephg/Chipmunk-js/pull/34/files and https://github.com/josephg/Chipmunk-js/issues/29
	        } else if (body.arbiterList === arb) {
	            body.arbiterList = next;
	        }

	        if (next) {
	            // cpArbiterThreadForBody(next, body)->prev = prev;
	            if (next.body_a === body) {
	                next.thread_a_prev = prev;
	            } else {
	                next.thread_b_prev = prev;
	            }
	        }
	    };

	    Arbiter.prototype.unthread = function () {
	        unthreadHelper(this, this.body_a, this.thread_a_prev, this.thread_a_next);
	        unthreadHelper(this, this.body_b, this.thread_b_prev, this.thread_b_next);
	        this.thread_a_prev = this.thread_a_next = null;
	        this.thread_b_prev = this.thread_b_next = null;
	    };

	    //cpFloat
	    //cpContactsEstimateCrushingImpulse(cpContact *contacts, int numContacts)
	    //{
	    //  cpFloat fsum = 0;
	    //  cpVect vsum = vzero;
	    //
	    //  for(int i=0; i<numContacts; i++){
	    //      cpContact *con = &contacts[i];
	    //      cpVect j = vrotate(con.n, v(con.jnAcc, con.jtAcc));
	    //
	    //      fsum += vlength(j);
	    //      vsum = vadd(vsum, j);
	    //  }
	    //
	    //  cpFloat vmag = vlength(vsum);
	    //  return (1 - vmag/fsum);
	    //}

	    Arbiter.prototype.update = function (contacts, handler, a, b) {
	        // Arbiters without contact data may exist if a collision function rejected the collision.
	        if (this.contacts) {
	            // Iterate over the possible pairs to look for hash value matches.
	            for (var i = 0; i < this.contacts.length; i++) {
	                var old = this.contacts[i];

	                for (var j = 0; j < contacts.length; j++) {
	                    var new_contact = contacts[j];

	                    // This could trigger false positives, but is fairly unlikely nor serious if it does.
	                    if (new_contact.hash === old.hash) {
	                        // Copy the persistant contact information.
	                        new_contact.jnAcc = old.jnAcc;
	                        new_contact.jtAcc = old.jtAcc;
	                    }
	                }
	            }
	        }

	        this.contacts = contacts;

	        this.handler = handler;
	        this.swappedColl = a.collision_type !== handler.a;

	        this.e = a.e * b.e;
	        this.u = a.u * b.u;
	        this.surface_vr = vsub(a.surface_v, b.surface_v);

	        // For collisions between two similar primitive types, the order could have been swapped.
	        this.a = a;this.body_a = a.body;
	        this.b = b;this.body_b = b.body;

	        // mark it as new if it's been cached
	        if (this.state == 'cached') this.state = 'first coll';
	    };

	    Arbiter.prototype.preStep = function (dt, slop, bias) {
	        var a = this.body_a;
	        var b = this.body_b;

	        for (var i = 0; i < this.contacts.length; i++) {
	            var con = this.contacts[i];

	            // Calculate the offsets.
	            con.r1 = vsub(con.p, a.p);
	            con.r2 = vsub(con.p, b.p);

	            // Calculate the mass normal and mass tangent.
	            con.nMass = 1 / k_scalar(a, b, con.r1, con.r2, con.n);
	            con.tMass = 1 / k_scalar(a, b, con.r1, con.r2, vperp(con.n));

	            // Calculate the target bias velocity.
	            con.bias = -bias * min(0, con.dist + slop) / dt;
	            con.jBias = 0;

	            // Calculate the target bounce velocity.
	            con.bounce = normal_relative_velocity(a, b, con.r1, con.r2, con.n) * this.e;
	        }
	    };

	    Arbiter.prototype.applyCachedImpulse = function (dt_coef) {
	        if (this.isFirstContact()) return;

	        var a = this.body_a;
	        var b = this.body_b;

	        for (var i = 0; i < this.contacts.length; i++) {
	            var con = this.contacts[i];
	            //var j = vrotate(con.n, new Vect(con.jnAcc, con.jtAcc));
	            var nx = con.n.x;
	            var ny = con.n.y;
	            var jx = nx * con.jnAcc - ny * con.jtAcc;
	            var jy = nx * con.jtAcc + ny * con.jnAcc;
	            //apply_impulses(a, b, con.r1, con.r2, vmult(j, dt_coef));
	            apply_impulses(a, b, con.r1, con.r2, jx * dt_coef, jy * dt_coef);
	        }
	    };

	    // TODO is it worth splitting velocity/position correction?

	    var numApplyImpulse = 0;
	    var numApplyContact = 0;

	    Arbiter.prototype.applyImpulse = function () {
	        numApplyImpulse++;
	        //if (!this.contacts) { throw new Error('contacts is undefined'); }
	        var a = this.body_a;
	        var b = this.body_b;
	        var surface_vr = this.surface_vr;
	        var friction = this.u;

	        for (var i = 0; i < this.contacts.length; i++) {
	            numApplyContact++;
	            var con = this.contacts[i];
	            var nMass = con.nMass;
	            var n = con.n;
	            var r1 = con.r1;
	            var r2 = con.r2;

	            //var vr = relative_velocity(a, b, r1, r2);
	            var vrx = b.vx - r2.y * b.w - (a.vx - r1.y * a.w);
	            var vry = b.vy + r2.x * b.w - (a.vy + r1.x * a.w);

	            //var vb1 = vadd(vmult(vperp(r1), a.w_bias), a.v_bias);
	            //var vb2 = vadd(vmult(vperp(r2), b.w_bias), b.v_bias);
	            //var vbn = vdot(vsub(vb2, vb1), n);

	            var vbn = n.x * (b.v_biasx - r2.y * b.w_bias - a.v_biasx + r1.y * a.w_bias) + n.y * (r2.x * b.w_bias + b.v_biasy - r1.x * a.w_bias - a.v_biasy);

	            var vrn = vdot2(vrx, vry, n.x, n.y);
	            //var vrt = vdot(vadd(vr, surface_vr), vperp(n));
	            var vrt = vdot2(vrx + surface_vr.x, vry + surface_vr.y, -n.y, n.x);

	            var jbn = (con.bias - vbn) * nMass;
	            var jbnOld = con.jBias;
	            con.jBias = max(jbnOld + jbn, 0);

	            var jn = -(con.bounce + vrn) * nMass;
	            var jnOld = con.jnAcc;
	            con.jnAcc = max(jnOld + jn, 0);

	            var jtMax = friction * con.jnAcc;
	            var jt = -vrt * con.tMass;
	            var jtOld = con.jtAcc;
	            con.jtAcc = clamp(jtOld + jt, -jtMax, jtMax);

	            //apply_bias_impulses(a, b, r1, r2, vmult(n, con.jBias - jbnOld));
	            var bias_x = n.x * (con.jBias - jbnOld);
	            var bias_y = n.y * (con.jBias - jbnOld);
	            apply_bias_impulse(a, -bias_x, -bias_y, r1);
	            apply_bias_impulse(b, bias_x, bias_y, r2);

	            //apply_impulses(a, b, r1, r2, vrotate(n, new Vect(con.jnAcc - jnOld, con.jtAcc - jtOld)));
	            var rot_x = con.jnAcc - jnOld;
	            var rot_y = con.jtAcc - jtOld;

	            // Inlining apply_impulses decreases speed for some reason :/
	            apply_impulses(a, b, r1, r2, n.x * rot_x - n.y * rot_y, n.x * rot_y + n.y * rot_x);
	        }
	    };

	    Arbiter.prototype.callSeparate = function (space) {
	        // The handler needs to be looked up again as the handler cached on the arbiter may have been deleted since the last step.
	        var handler = space.lookupHandler(this.a.collision_type, this.b.collision_type);
	        handler.separate(this, space);
	    };

	    // From chipmunk_private.h
	    Arbiter.prototype.next = function (body) {
	        return this.body_a == body ? this.thread_a_next : this.thread_b_next;
	    };
	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var numContacts = 0;

	    var Contact = function Contact(p, n, dist, hash) {
	        this.p = p;
	        this.n = n;
	        this.dist = dist;

	        this.r1 = this.r2 = vzero;
	        this.nMass = this.tMass = this.bounce = this.bias = 0;

	        this.jnAcc = this.jtAcc = this.jBias = 0;

	        this.hash = hash;
	        numContacts++;
	    };

	    var NONE = [];

	    // Add contact points for circle to circle collisions.
	    // Used by several collision tests.
	    var circle2circleQuery = function circle2circleQuery(p1, p2, r1, r2) {
	        var mindist = r1 + r2;
	        var delta = vsub(p2, p1);
	        var distsq = vlengthsq(delta);
	        if (distsq >= mindist * mindist) return;

	        var dist = Math.sqrt(distsq);

	        // Allocate and initialize the contact.
	        return new Contact(vadd(p1, vmult(delta, 0.5 + (r1 - 0.5 * mindist) / (dist ? dist : Infinity))), dist ? vmult(delta, 1 / dist) : new Vect(1, 0), dist - mindist, 0);
	    };

	    // Collide circle shapes.
	    var circle2circle = function circle2circle(circ1, circ2) {
	        var contact = circle2circleQuery(circ1.tc, circ2.tc, circ1.r, circ2.r);
	        return contact ? [contact] : NONE;
	    };

	    var circle2segment = function circle2segment(circleShape, segmentShape) {
	        var seg_a = segmentShape.ta;
	        var seg_b = segmentShape.tb;
	        var center = circleShape.tc;

	        var seg_delta = vsub(seg_b, seg_a);
	        var closest_t = clamp01(vdot(seg_delta, vsub(center, seg_a)) / vlengthsq(seg_delta));
	        var closest = vadd(seg_a, vmult(seg_delta, closest_t));

	        var contact = circle2circleQuery(center, closest, circleShape.r, segmentShape.r);
	        if (contact) {
	            var n = contact.n;

	            // Reject endcap collisions if tangents are provided.
	            return closest_t === 0 && vdot(n, segmentShape.a_tangent) < 0 || closest_t === 1 && vdot(n, segmentShape.b_tangent) < 0 ? NONE : [contact];
	        } else {
	            return NONE;
	        }
	    };

	    // Find the minimum separating axis for the given poly and axis list.
	    //
	    // This function needs to return two values - the index of the min. separating axis and
	    // the value itself. Short of inlining MSA, returning values through a global like this
	    // is the fastest implementation.
	    //
	    // See: http://jsperf.com/return-two-values-from-function/2
	    var last_MSA_min = 0;
	    var findMSA = function findMSA(poly, planes) {
	        var min_index = 0;
	        var min = poly.valueOnAxis(planes[0].n, planes[0].d);
	        if (min > 0) return -1;

	        for (var i = 1; i < planes.length; i++) {
	            var dist = poly.valueOnAxis(planes[i].n, planes[i].d);
	            if (dist > 0) {
	                return -1;
	            } else if (dist > min) {
	                min = dist;
	                min_index = i;
	            }
	        }

	        last_MSA_min = min;
	        return min_index;
	    };

	    // Add contacts for probably penetrating vertexes.
	    // This handles the degenerate case where an overlap was detected, but no vertexes fall inside
	    // the opposing polygon. (like a star of david)
	    var findVertsFallback = function findVertsFallback(poly1, poly2, n, dist) {
	        var arr = [];

	        var verts1 = poly1.tVerts;
	        for (var i = 0; i < verts1.length; i += 2) {
	            var vx = verts1[i];
	            var vy = verts1[i + 1];
	            if (poly2.containsVertPartial(vx, vy, vneg(n))) {
	                arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i)));
	            }
	        }

	        var verts2 = poly2.tVerts;
	        for (var i = 0; i < verts2.length; i += 2) {
	            var vx = verts2[i];
	            var vy = verts2[i + 1];
	            if (poly1.containsVertPartial(vx, vy, n)) {
	                arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i)));
	            }
	        }

	        return arr;
	    };

	    // Add contacts for penetrating vertexes.
	    var findVerts = function findVerts(poly1, poly2, n, dist) {
	        var arr = [];

	        var verts1 = poly1.tVerts;
	        for (var i = 0; i < verts1.length; i += 2) {
	            var vx = verts1[i];
	            var vy = verts1[i + 1];
	            if (poly2.containsVert(vx, vy)) {
	                arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly1.hashid, i >> 1)));
	            }
	        }

	        var verts2 = poly2.tVerts;
	        for (var i = 0; i < verts2.length; i += 2) {
	            var vx = verts2[i];
	            var vy = verts2[i + 1];
	            if (poly1.containsVert(vx, vy)) {
	                arr.push(new Contact(new Vect(vx, vy), n, dist, hashPair(poly2.hashid, i >> 1)));
	            }
	        }

	        return arr.length ? arr : findVertsFallback(poly1, poly2, n, dist);
	    };

	    // Collide poly shapes together.
	    var poly2poly = function poly2poly(poly1, poly2) {
	        var mini1 = findMSA(poly2, poly1.tPlanes);
	        if (mini1 == -1) return NONE;
	        var min1 = last_MSA_min;

	        var mini2 = findMSA(poly1, poly2.tPlanes);
	        if (mini2 == -1) return NONE;
	        var min2 = last_MSA_min;

	        // There is overlap, find the penetrating verts
	        if (min1 > min2) return findVerts(poly1, poly2, poly1.tPlanes[mini1].n, min1);else return findVerts(poly1, poly2, vneg(poly2.tPlanes[mini2].n), min2);
	    };

	    // Like cpPolyValueOnAxis(), but for segments.
	    var segValueOnAxis = function segValueOnAxis(seg, n, d) {
	        var a = vdot(n, seg.ta) - seg.r;
	        var b = vdot(n, seg.tb) - seg.r;
	        return min(a, b) - d;
	    };

	    // Identify vertexes that have penetrated the segment.
	    var findPointsBehindSeg = function findPointsBehindSeg(arr, seg, poly, pDist, coef) {
	        var dta = vcross(seg.tn, seg.ta);
	        var dtb = vcross(seg.tn, seg.tb);
	        var n = vmult(seg.tn, coef);

	        var verts = poly.tVerts;
	        for (var i = 0; i < verts.length; i += 2) {
	            var vx = verts[i];
	            var vy = verts[i + 1];
	            if (vdot2(vx, vy, n.x, n.y) < vdot(seg.tn, seg.ta) * coef + seg.r) {
	                var dt = vcross2(seg.tn.x, seg.tn.y, vx, vy);
	                if (dta >= dt && dt >= dtb) {
	                    arr.push(new Contact(new Vect(vx, vy), n, pDist, hashPair(poly.hashid, i)));
	                }
	            }
	        }
	    };

	    // This one is complicated and gross. Just don't go there...
	    // TODO: Comment me!
	    var seg2poly = function seg2poly(seg, poly) {
	        var arr = [];

	        var planes = poly.tPlanes;
	        var numVerts = planes.length;

	        var segD = vdot(seg.tn, seg.ta);
	        var minNorm = poly.valueOnAxis(seg.tn, segD) - seg.r;
	        var minNeg = poly.valueOnAxis(vneg(seg.tn), -segD) - seg.r;
	        if (minNeg > 0 || minNorm > 0) return NONE;

	        var mini = 0;
	        var poly_min = segValueOnAxis(seg, planes[0].n, planes[0].d);
	        if (poly_min > 0) return NONE;
	        for (var i = 0; i < numVerts; i++) {
	            var dist = segValueOnAxis(seg, planes[i].n, planes[i].d);
	            if (dist > 0) {
	                return NONE;
	            } else if (dist > poly_min) {
	                poly_min = dist;
	                mini = i;
	            }
	        }

	        var poly_n = vneg(planes[mini].n);

	        var va = vadd(seg.ta, vmult(poly_n, seg.r));
	        var vb = vadd(seg.tb, vmult(poly_n, seg.r));
	        if (poly.containsVert(va.x, va.y)) arr.push(new Contact(va, poly_n, poly_min, hashPair(seg.hashid, 0)));
	        if (poly.containsVert(vb.x, vb.y)) arr.push(new Contact(vb, poly_n, poly_min, hashPair(seg.hashid, 1)));

	        // Floating point precision problems here.
	        // This will have to do for now.
	        //  poly_min -= cp_collision_slop; // TODO is this needed anymore?

	        if (minNorm >= poly_min || minNeg >= poly_min) {
	            if (minNorm > minNeg) findPointsBehindSeg(arr, seg, poly, minNorm, 1);else findPointsBehindSeg(arr, seg, poly, minNeg, -1);
	        }

	        // If no other collision points are found, try colliding endpoints.
	        if (arr.length === 0) {
	            var mini2 = mini * 2;
	            var verts = poly.tVerts;

	            var poly_a = new Vect(verts[mini2], verts[mini2 + 1]);

	            var con;
	            if (con = circle2circleQuery(seg.ta, poly_a, seg.r, 0, arr)) return [con];
	            if (con = circle2circleQuery(seg.tb, poly_a, seg.r, 0, arr)) return [con];

	            var len = numVerts * 2;
	            var poly_b = new Vect(verts[(mini2 + 2) % len], verts[(mini2 + 3) % len]);
	            if (con = circle2circleQuery(seg.ta, poly_b, seg.r, 0, arr)) return [con];
	            if (con = circle2circleQuery(seg.tb, poly_b, seg.r, 0, arr)) return [con];
	        }

	        //  console.log(poly.tVerts, poly.tPlanes);
	        //  console.log('seg2poly', arr);
	        return arr;
	    };

	    // This one is less gross, but still gross.
	    // TODO: Comment me!
	    var circle2poly = function circle2poly(circ, poly) {
	        var planes = poly.tPlanes;

	        var mini = 0;
	        var min = vdot(planes[0].n, circ.tc) - planes[0].d - circ.r;
	        for (var i = 0; i < planes.length; i++) {
	            var dist = vdot(planes[i].n, circ.tc) - planes[i].d - circ.r;
	            if (dist > 0) {
	                return NONE;
	            } else if (dist > min) {
	                min = dist;
	                mini = i;
	            }
	        }

	        var n = planes[mini].n;

	        var verts = poly.tVerts;
	        var len = verts.length;
	        var mini2 = mini << 1;

	        //var a = poly.tVerts[mini];
	        //var b = poly.tVerts[(mini + 1)%poly.tVerts.length];
	        var ax = verts[mini2];
	        var ay = verts[mini2 + 1];
	        var bx = verts[(mini2 + 2) % len];
	        var by = verts[(mini2 + 3) % len];

	        var dta = vcross2(n.x, n.y, ax, ay);
	        var dtb = vcross2(n.x, n.y, bx, by);
	        var dt = vcross(n, circ.tc);

	        if (dt < dtb) {
	            var con = circle2circleQuery(circ.tc, new Vect(bx, by), circ.r, 0, con);
	            return con ? [con] : NONE;
	        } else if (dt < dta) {
	            return [new Contact(vsub(circ.tc, vmult(n, circ.r + min / 2)), vneg(n), min, 0)];
	        } else {
	            var con = circle2circleQuery(circ.tc, new Vect(ax, ay), circ.r, 0, con);
	            return con ? [con] : NONE;
	        }
	    };

	    // The javascripty way to do this would be either nested object or methods on the prototypes.
	    //
	    // However, the *fastest* way is the method below.
	    // See: http://jsperf.com/dispatch

	    // These are copied from the prototypes into the actual objects in the Shape constructor.
	    CircleShape.prototype.collisionCode = 0;
	    SegmentShape.prototype.collisionCode = 1;
	    PolyShape.prototype.collisionCode = 2;

	    CircleShape.prototype.collisionTable = [circle2circle, circle2segment, circle2poly];

	    SegmentShape.prototype.collisionTable = [null, function (segA, segB) {
	        return NONE;
	    }, // seg2seg
	    seg2poly];

	    PolyShape.prototype.collisionTable = [null, null, poly2poly];

	    var collideShapes = cp.collideShapes = function (a, b) {
	        assert(a.collisionCode <= b.collisionCode, 'Collided shapes must be sorted by type');
	        return a.collisionTable[b.collisionCode](a, b);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var defaultCollisionHandler = new CollisionHandler();

	    /// Basic Unit of Simulation in Chipmunk
	    var Space = cp.Space = function () {
	        this.stamp = 0;
	        this.curr_dt = 0;

	        this.bodies = [];
	        this.rousedBodies = [];
	        this.sleepingComponents = [];

	        this.staticShapes = new BBTree(null);
	        this.activeShapes = new BBTree(this.staticShapes);

	        this.arbiters = [];
	        this.contactBuffersHead = null;
	        this.cachedArbiters = {};
	        //this.pooledArbiters = [];

	        this.constraints = [];

	        this.locked = 0;

	        this.collisionHandlers = {};
	        this.defaultHandler = defaultCollisionHandler;

	        this.postStepCallbacks = [];

	        /// Number of iterations to use in the impulse solver to solve contacts.
	        this.iterations = 10;

	        /// Gravity to pass to rigid bodies when integrating velocity.
	        this.gravity = vzero;

	        /// Damping rate expressed as the fraction of velocity bodies retain each second.
	        /// A value of 0.9 would mean that each body's velocity will drop 10% per second.
	        /// The default value is 1.0, meaning no damping is applied.
	        /// @note This damping value is different than those of cpDampedSpring and cpDampedRotarySpring.
	        this.damping = 1;

	        /// Speed threshold for a body to be considered idle.
	        /// The default value of 0 means to let the space guess a good threshold based on gravity.
	        this.idleSpeedThreshold = 0;

	        /// Time a group of bodies must remain idle in order to fall asleep.
	        /// Enabling sleeping also implicitly enables the the contact graph.
	        /// The default value of Infinity disables the sleeping algorithm.
	        this.sleepTimeThreshold = Infinity;

	        /// Amount of encouraged penetration between colliding shapes..
	        /// Used to reduce oscillating contacts and keep the collision cache warm.
	        /// Defaults to 0.1. If you have poor simulation quality,
	        /// increase this number as much as possible without allowing visible amounts of overlap.
	        this.collisionSlop = 0.1;

	        /// Determines how fast overlapping shapes are pushed apart.
	        /// Expressed as a fraction of the error remaining after each second.
	        /// Defaults to pow(1.0 - 0.1, 60.0) meaning that Chipmunk fixes 10% of overlap each frame at 60Hz.
	        this.collisionBias = Math.pow(1 - 0.1, 60);

	        /// Number of frames that contact information should persist.
	        /// Defaults to 3. There is probably never a reason to change this value.
	        this.collisionPersistence = 3;

	        /// Rebuild the contact graph during each step. Must be enabled to use the cpBodyEachArbiter() function.
	        /// Disabled by default for a small performance boost. Enabled implicitly when the sleeping feature is enabled.
	        this.enableContactGraph = false;

	        /// The designated static body for this space.
	        /// You can modify this body, or replace it with your own static body.
	        /// By default it points to a statically allocated cpBody in the cpSpace struct.
	        this.staticBody = new Body(Infinity, Infinity);
	        this.staticBody.nodeIdleTime = Infinity;

	        // Cache the collideShapes callback function for the space.
	        this.collideShapes = this.makeCollideShapes();
	    };

	    Space.prototype.getCurrentTimeStep = function () {
	        return this.curr_dt;
	    };

	    Space.prototype.setIterations = function (iter) {
	        this.iterations = iter;
	    };

	    /// returns true from inside a callback and objects cannot be added/removed.
	    Space.prototype.isLocked = function () {
	        return this.locked;
	    };

	    var assertSpaceUnlocked = function assertSpaceUnlocked(space) {
	        assert(!space.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep() \
	 or during a query. Put these calls into a post-step callback.");
	    };

	    // **** Collision handler function management

	    /// Set a collision handler to be used whenever the two shapes with the given collision types collide.
	    /// You can pass null for any function you don't want to implement.
	    Space.prototype.addCollisionHandler = function (a, b, begin, preSolve, postSolve, separate) {
	        assertSpaceUnlocked(this);

	        // Remove any old function so the new one will get added.
	        this.removeCollisionHandler(a, b);

	        var handler = new CollisionHandler();
	        handler.a = a;
	        handler.b = b;
	        if (begin) handler.begin = begin;
	        if (preSolve) handler.preSolve = preSolve;
	        if (postSolve) handler.postSolve = postSolve;
	        if (separate) handler.separate = separate;

	        this.collisionHandlers[hashPair(a, b)] = handler;
	    };

	    /// Unset a collision handler.
	    Space.prototype.removeCollisionHandler = function (a, b) {
	        assertSpaceUnlocked(this);

	        delete this.collisionHandlers[hashPair(a, b)];
	    };

	    /// Set a default collision handler for this space.
	    /// The default collision handler is invoked for each colliding pair of shapes
	    /// that isn't explicitly handled by a specific collision handler.
	    /// You can pass null for any function you don't want to implement.
	    Space.prototype.setDefaultCollisionHandler = function (begin, preSolve, postSolve, separate) {
	        assertSpaceUnlocked(this);

	        var handler = new CollisionHandler();
	        if (begin) handler.begin = begin;
	        if (preSolve) handler.preSolve = preSolve;
	        if (postSolve) handler.postSolve = postSolve;
	        if (separate) handler.separate = separate;

	        this.defaultHandler = handler;
	    };

	    Space.prototype.lookupHandler = function (a, b) {
	        return this.collisionHandlers[hashPair(a, b)] || this.defaultHandler;
	    };

	    // **** Body, Shape, and Joint Management

	    /// Add a collision shape to the simulation.
	    /// If the shape is attached to a static body, it will be added as a static shape.
	    Space.prototype.addShape = function (shape) {
	        var body = shape.body;
	        if (body.isStatic()) return this.addStaticShape(shape);

	        assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
	        assertSpaceUnlocked(this);

	        body.activate();
	        body.addShape(shape);

	        shape.update(body.p, body.rot);
	        this.activeShapes.insert(shape, shape.hashid);
	        shape.space = this;

	        return shape;
	    };

	    /// Explicity add a shape as a static shape to the simulation.
	    Space.prototype.addStaticShape = function (shape) {
	        assert(!shape.space, "This shape is already added to a space and cannot be added to another.");
	        assertSpaceUnlocked(this);

	        var body = shape.body;
	        body.addShape(shape);

	        shape.update(body.p, body.rot);
	        this.staticShapes.insert(shape, shape.hashid);
	        shape.space = this;

	        return shape;
	    };

	    /// Add a rigid body to the simulation.
	    Space.prototype.addBody = function (body) {
	        assert(!body.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated.");
	        assert(!body.space, "This body is already added to a space and cannot be added to another.");
	        assertSpaceUnlocked(this);

	        this.bodies.push(body);
	        body.space = this;

	        return body;
	    };

	    /// Add a constraint to the simulation.
	    Space.prototype.addConstraint = function (constraint) {
	        assert(!constraint.space, "This shape is already added to a space and cannot be added to another.");
	        assertSpaceUnlocked(this);

	        var a = constraint.a,
	            b = constraint.b;

	        a.activate();
	        b.activate();
	        this.constraints.push(constraint);

	        // Push onto the heads of the bodies' constraint lists
	        constraint.next_a = a.constraintList;a.constraintList = constraint;
	        constraint.next_b = b.constraintList;b.constraintList = constraint;
	        constraint.space = this;

	        return constraint;
	    };

	    Space.prototype.filterArbiters = function (body, filter) {
	        for (var hash in this.cachedArbiters) {
	            var arb = this.cachedArbiters[hash];

	            // Match on the filter shape, or if it's null the filter body
	            if (body === arb.body_a && (filter === arb.a || filter === null) || body === arb.body_b && (filter === arb.b || filter === null)) {
	                // Call separate when removing shapes.
	                if (filter && arb.state !== 'cached') arb.callSeparate(this);

	                arb.unthread();

	                deleteObjFromList(this.arbiters, arb);
	                //this.pooledArbiters.push(arb);

	                delete this.cachedArbiters[hash];
	            }
	        }
	    };

	    /// Remove a collision shape from the simulation.
	    Space.prototype.removeShape = function (shape) {
	        var body = shape.body;
	        if (body.isStatic()) {
	            this.removeStaticShape(shape);
	        } else {
	            assert(this.containsShape(shape), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)");
	            assertSpaceUnlocked(this);

	            body.activate();
	            body.removeShape(shape);
	            this.filterArbiters(body, shape);
	            this.activeShapes.remove(shape, shape.hashid);
	            shape.space = null;
	        }
	    };

	    /// Remove a collision shape added using addStaticShape() from the simulation.
	    Space.prototype.removeStaticShape = function (shape) {
	        assert(this.containsShape(shape), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
	        assertSpaceUnlocked(this);

	        var body = shape.body;
	        if (body.isStatic()) body.activateStatic(shape);
	        body.removeShape(shape);
	        this.filterArbiters(body, shape);
	        this.staticShapes.remove(shape, shape.hashid);
	        shape.space = null;
	    };

	    /// Remove a rigid body from the simulation.
	    Space.prototype.removeBody = function (body) {
	        assert(this.containsBody(body), "Cannot remove a body that was not added to the space. (Removed twice maybe?)");
	        assertSpaceUnlocked(this);

	        body.activate();
	        //  this.filterArbiters(body, null);
	        deleteObjFromList(this.bodies, body);
	        body.space = null;
	    };

	    /// Remove a constraint from the simulation.
	    Space.prototype.removeConstraint = function (constraint) {
	        assert(this.containsConstraint(constraint), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
	        assertSpaceUnlocked(this);

	        constraint.a.activate();
	        constraint.b.activate();
	        deleteObjFromList(this.constraints, constraint);

	        constraint.a.removeConstraint(constraint);
	        constraint.b.removeConstraint(constraint);
	        constraint.space = null;
	    };

	    /// Test if a collision shape has been added to the space.
	    Space.prototype.containsShape = function (shape) {
	        return shape.space === this;
	    };

	    /// Test if a rigid body has been added to the space.
	    Space.prototype.containsBody = function (body) {
	        return body.space == this;
	    };

	    /// Test if a constraint has been added to the space.
	    Space.prototype.containsConstraint = function (constraint) {
	        return constraint.space == this;
	    };

	    Space.prototype.uncacheArbiter = function (arb) {
	        delete this.cachedArbiters[hashPair(arb.a.hashid, arb.b.hashid)];
	        deleteObjFromList(this.arbiters, arb);
	    };

	    // **** Iteration

	    /// Call @c func for each body in the space.
	    Space.prototype.eachBody = function (func) {
	        this.lock();{
	            var bodies = this.bodies;

	            for (var i = 0; i < bodies.length; i++) {
	                func(bodies[i]);
	            }

	            var components = this.sleepingComponents;
	            for (var i = 0; i < components.length; i++) {
	                var root = components[i];

	                var body = root;
	                while (body) {
	                    var next = body.nodeNext;
	                    func(body);
	                    body = next;
	                }
	            }
	        }this.unlock(true);
	    };

	    /// Call @c func for each shape in the space.
	    Space.prototype.eachShape = function (func) {
	        this.lock();{
	            this.activeShapes.each(func);
	            this.staticShapes.each(func);
	        }this.unlock(true);
	    };

	    /// Call @c func for each shape in the space.
	    Space.prototype.eachConstraint = function (func) {
	        this.lock();{
	            var constraints = this.constraints;

	            for (var i = 0; i < constraints.length; i++) {
	                func(constraints[i]);
	            }
	        }this.unlock(true);
	    };

	    // **** Spatial Index Management

	    /// Update the collision detection info for the static shapes in the space.
	    Space.prototype.reindexStatic = function () {
	        assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");

	        this.staticShapes.each(function (shape) {
	            var body = shape.body;
	            shape.update(body.p, body.rot);
	        });
	        this.staticShapes.reindex();
	    };

	    /// Update the collision detection data for a specific shape in the space.
	    Space.prototype.reindexShape = function (shape) {
	        assert(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");

	        var body = shape.body;
	        shape.update(body.p, body.rot);

	        // attempt to rehash the shape in both hashes
	        this.activeShapes.reindexObject(shape, shape.hashid);
	        this.staticShapes.reindexObject(shape, shape.hashid);
	    };

	    /// Update the collision detection data for all shapes attached to a body.
	    Space.prototype.reindexShapesForBody = function (body) {
	        for (var shape = body.shapeList; shape; shape = shape.next) {
	            this.reindexShape(shape);
	        }
	    };

	    /// Switch the space to use a spatial has as it's spatial index.
	    Space.prototype.useSpatialHash = function (dim, count) {
	        throw new Error('Spatial Hash not implemented.');

	        var staticShapes = new SpaceHash(dim, count, null);
	        var activeShapes = new SpaceHash(dim, count, staticShapes);

	        this.staticShapes.each(function (shape) {
	            staticShapes.insert(shape, shape.hashid);
	        });
	        this.activeShapes.each(function (shape) {
	            activeShapes.insert(shape, shape.hashid);
	        });

	        this.staticShapes = staticShapes;
	        this.activeShapes = activeShapes;
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    /// **** Sleeping Functions

	    Space.prototype.activateBody = function (body) {
	        assert(!body.isRogue(), "Internal error: Attempting to activate a rogue body.");

	        if (this.locked) {
	            // cpSpaceActivateBody() is called again once the space is unlocked
	            if (this.rousedBodies.indexOf(body) === -1) this.rousedBodies.push(body);
	        } else {
	            this.bodies.push(body);

	            for (var i = 0; i < body.shapeList.length; i++) {
	                var shape = body.shapeList[i];
	                this.staticShapes.remove(shape, shape.hashid);
	                this.activeShapes.insert(shape, shape.hashid);
	            }

	            for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
	                var bodyA = arb.body_a;
	                if (body === bodyA || bodyA.isStatic()) {
	                    //var contacts = arb.contacts;

	                    // Restore contact values back to the space's contact buffer memory
	                    //arb.contacts = cpContactBufferGetArray(this);
	                    //memcpy(arb.contacts, contacts, numContacts*sizeof(cpContact));
	                    //cpSpacePushContacts(this, numContacts);

	                    // Reinsert the arbiter into the arbiter cache
	                    var a = arb.a,
	                        b = arb.b;
	                    this.cachedArbiters[hashPair(a.hashid, b.hashid)] = arb;

	                    // Update the arbiter's state
	                    arb.stamp = this.stamp;
	                    arb.handler = this.lookupHandler(a.collision_type, b.collision_type);
	                    this.arbiters.push(arb);
	                }
	            }

	            for (var constraint = body.constraintList; constraint; constraint = constraint.nodeNext) {
	                var bodyA = constraint.a;
	                if (body === bodyA || bodyA.isStatic()) this.constraints.push(constraint);
	            }
	        }
	    };

	    Space.prototype.deactivateBody = function (body) {
	        assert(!body.isRogue(), "Internal error: Attempting to deactivate a rogue body.");

	        deleteObjFromList(this.bodies, body);

	        for (var i = 0; i < body.shapeList.length; i++) {
	            var shape = body.shapeList[i];
	            this.activeShapes.remove(shape, shape.hashid);
	            this.staticShapes.insert(shape, shape.hashid);
	        }

	        for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
	            var bodyA = arb.body_a;
	            if (body === bodyA || bodyA.isStatic()) {
	                this.uncacheArbiter(arb);

	                // Save contact values to a new block of memory so they won't time out
	                //size_t bytes = arb.numContacts*sizeof(cpContact);
	                //cpContact *contacts = (cpContact *)cpcalloc(1, bytes);
	                //memcpy(contacts, arb.contacts, bytes);
	                //arb.contacts = contacts;
	            }
	        }

	        for (var constraint = body.constraintList; constraint; constraint = constraint.nodeNext) {
	            var bodyA = constraint.a;
	            if (body === bodyA || bodyA.isStatic()) deleteObjFromList(this.constraints, constraint);
	        }
	    };

	    var componentRoot = function componentRoot(body) {
	        return body ? body.nodeRoot : null;
	    };

	    var componentActivate = function componentActivate(root) {
	        if (!root || !root.isSleeping(root)) return;
	        assert(!root.isRogue(), "Internal Error: componentActivate() called on a rogue body.");

	        var space = root.space;
	        var body = root;
	        while (body) {
	            var next = body.nodeNext;

	            body.nodeIdleTime = 0;
	            body.nodeRoot = null;
	            body.nodeNext = null;
	            space.activateBody(body);

	            body = next;
	        }

	        deleteObjFromList(space.sleepingComponents, root);
	    };

	    Body.prototype.activate = function () {
	        if (!this.isRogue()) {
	            this.nodeIdleTime = 0;
	            componentActivate(componentRoot(this));
	        }
	    };

	    Body.prototype.activateStatic = function (filter) {
	        assert(this.isStatic(), "Body.activateStatic() called on a non-static body.");

	        for (var arb = this.arbiterList; arb; arb = arb.next(this)) {
	            if (!filter || filter == arb.a || filter == arb.b) {
	                (arb.body_a == this ? arb.body_b : arb.body_a).activate();
	            }
	        }

	        // TODO should also activate joints!
	    };

	    Body.prototype.pushArbiter = function (arb) {
	        assertSoft((arb.body_a === this ? arb.thread_a_next : arb.thread_b_next) === null, "Internal Error: Dangling contact graph pointers detected. (A)");
	        assertSoft((arb.body_a === this ? arb.thread_a_prev : arb.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (B)");

	        var next = this.arbiterList;
	        assertSoft(next === null || (next.body_a === this ? next.thread_a_prev : next.thread_b_prev) === null, "Internal Error: Dangling contact graph pointers detected. (C)");

	        if (arb.body_a === this) {
	            arb.thread_a_next = next;
	        } else {
	            arb.thread_b_next = next;
	        }

	        if (next) {
	            if (next.body_a === this) {
	                next.thread_a_prev = arb;
	            } else {
	                next.thread_b_prev = arb;
	            }
	        }
	        this.arbiterList = arb;
	    };

	    var componentAdd = function componentAdd(root, body) {
	        body.nodeRoot = root;

	        if (body !== root) {
	            body.nodeNext = root.nodeNext;
	            root.nodeNext = body;
	        }
	    };

	    var floodFillComponent = function floodFillComponent(root, body) {
	        // Rogue bodies cannot be put to sleep and prevent bodies they are touching from sleeping anyway.
	        // Static bodies (which are a type of rogue body) are effectively sleeping all the time.
	        if (!body.isRogue()) {
	            var other_root = componentRoot(body);
	            if (other_root == null) {
	                componentAdd(root, body);
	                for (var arb = body.arbiterList; arb; arb = arb.next(body)) {
	                    floodFillComponent(root, body == arb.body_a ? arb.body_b : arb.body_a);
	                }
	                for (var constraint = body.constraintList; constraint; constraint = constraint.next(body)) {
	                    floodFillComponent(root, body == constraint.a ? constraint.b : constraint.a);
	                }
	            } else {
	                assertSoft(other_root === root, "Internal Error: Inconsistency detected in the contact graph.");
	            }
	        }
	    };

	    var componentActive = function componentActive(root, threshold) {
	        for (var body = root; body; body = body.nodeNext) {
	            if (body.nodeIdleTime < threshold) return true;
	        }

	        return false;
	    };

	    Space.prototype.processComponents = function (dt) {
	        var sleep = this.sleepTimeThreshold !== Infinity;
	        var bodies = this.bodies;

	        // These checks can be removed at some stage (if DEBUG == undefined)
	        for (var i = 0; i < bodies.length; i++) {
	            var body = bodies[i];

	            assertSoft(body.nodeNext === null, "Internal Error: Dangling next pointer detected in contact graph.");
	            assertSoft(body.nodeRoot === null, "Internal Error: Dangling root pointer detected in contact graph.");
	        }

	        // Calculate the kinetic energy of all the bodies
	        if (sleep) {
	            var dv = this.idleSpeedThreshold;
	            var dvsq = dv ? dv * dv : vlengthsq(this.gravity) * dt * dt;

	            for (var i = 0; i < bodies.length; i++) {
	                var body = bodies[i];

	                // Need to deal with infinite mass objects
	                var keThreshold = dvsq ? body.m * dvsq : 0;
	                body.nodeIdleTime = body.kineticEnergy() > keThreshold ? 0 : body.nodeIdleTime + dt;
	            }
	        }

	        // Awaken any sleeping bodies found and then push arbiters to the bodies' lists.
	        var arbiters = this.arbiters;
	        for (var i = 0, count = arbiters.length; i < count; i++) {
	            var arb = arbiters[i];
	            var a = arb.body_a,
	                b = arb.body_b;

	            if (sleep) {
	                if (b.isRogue() && !b.isStatic() || a.isSleeping()) a.activate();
	                if (a.isRogue() && !a.isStatic() || b.isSleeping()) b.activate();
	            }

	            a.pushArbiter(arb);
	            b.pushArbiter(arb);
	        }

	        if (sleep) {
	            // Bodies should be held active if connected by a joint to a non-static rouge body.
	            var constraints = this.constraints;
	            for (var i = 0; i < constraints.length; i++) {
	                var constraint = constraints[i];
	                var a = constraint.a,
	                    b = constraint.b;

	                if (b.isRogue() && !b.isStatic()) a.activate();
	                if (a.isRogue() && !a.isStatic()) b.activate();
	            }

	            // Generate components and deactivate sleeping ones
	            for (var i = 0; i < bodies.length;) {
	                var body = bodies[i];

	                if (componentRoot(body) === null) {
	                    // Body not in a component yet. Perform a DFS to flood fill mark
	                    // the component in the contact graph using this body as the root.
	                    floodFillComponent(body, body);

	                    // Check if the component should be put to sleep.
	                    if (!componentActive(body, this.sleepTimeThreshold)) {
	                        this.sleepingComponents.push(body);
	                        for (var other = body; other; other = other.nodeNext) {
	                            this.deactivateBody(other);
	                        }

	                        // deactivateBody() removed the current body from the list.
	                        // Skip incrementing the index counter.
	                        continue;
	                    }
	                }

	                i++;

	                // Only sleeping bodies retain their component node pointers.
	                body.nodeRoot = null;
	                body.nodeNext = null;
	            }
	        }
	    };

	    Body.prototype.sleep = function () {
	        this.sleepWithGroup(null);
	    };

	    Body.prototype.sleepWithGroup = function (group) {
	        assert(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");

	        var space = this.space;
	        assert(space, "Cannot put a rogue body to sleep.");
	        assert(!space.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback.");
	        assert(group === null || group.isSleeping(), "Cannot use a non-sleeping body as a group identifier.");

	        if (this.isSleeping()) {
	            assert(componentRoot(this) === componentRoot(group), "The body is already sleeping and it's group cannot be reassigned.");
	            return;
	        }

	        for (var i = 0; i < this.shapeList.length; i++) {
	            this.shapeList[i].update(this.p, this.rot);
	        }
	        space.deactivateBody(this);

	        if (group) {
	            var root = componentRoot(group);

	            this.nodeRoot = root;
	            this.nodeNext = root.nodeNext;
	            this.nodeIdleTime = 0;

	            root.nodeNext = this;
	        } else {
	            this.nodeRoot = this;
	            this.nodeNext = null;
	            this.nodeIdleTime = 0;

	            space.sleepingComponents.push(this);
	        }

	        deleteObjFromList(space.bodies, this);
	    };

	    Space.prototype.activateShapesTouchingShape = function (shape) {
	        if (this.sleepTimeThreshold !== Infinity) {
	            this.shapeQuery(shape, function (shape, points) {
	                shape.body.activate();
	            });
	        }
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // Point query functions

	    /// Query the space at a point and call @c func for each shape found.
	    Space.prototype.pointQuery = function (point, layers, group, func) {
	        var helper = function helper(shape) {
	            if (!(shape.group && group === shape.group) && layers & shape.layers && shape.pointQuery(point)) {
	                func(shape);
	            }
	        };

	        var bb = new BB(point.x, point.y, point.x, point.y);
	        this.lock();{
	            this.activeShapes.query(bb, helper);
	            this.staticShapes.query(bb, helper);
	        }this.unlock(true);
	    };

	    /// Query the space at a point and return the first shape found. Returns null if no shapes were found.
	    Space.prototype.pointQueryFirst = function (point, layers, group) {
	        var outShape = null;
	        this.pointQuery(point, layers, group, function (shape) {
	            if (!shape.sensor) outShape = shape;
	        });

	        return outShape;
	    };

	    // Nearest point query functions

	    Space.prototype.nearestPointQuery = function (point, maxDistance, layers, group, func) {
	        var helper = function helper(shape) {
	            if (!(shape.group && group === shape.group) && layers & shape.layers) {
	                var info = shape.nearestPointQuery(point);

	                if (info.d < maxDistance) func(shape, info.d, info.p);
	            }
	        };

	        var bb = bbNewForCircle(point, maxDistance);

	        this.lock();{
	            this.activeShapes.query(bb, helper);
	            this.staticShapes.query(bb, helper);
	        }this.unlock(true);
	    };

	    // Unlike the version in chipmunk, this returns a NearestPointQueryInfo object. Use its .shape
	    // property to get the actual shape.
	    Space.prototype.nearestPointQueryNearest = function (point, maxDistance, layers, group) {
	        var out;

	        var helper = function helper(shape) {
	            if (!(shape.group && group === shape.group) && layers & shape.layers && !shape.sensor) {
	                var info = shape.nearestPointQuery(point);

	                if (info.d < maxDistance && (!out || info.d < out.d)) out = info;
	            }
	        };

	        var bb = bbNewForCircle(point, maxDistance);
	        this.activeShapes.query(bb, helper);
	        this.staticShapes.query(bb, helper);

	        return out;
	    };

	    /// Perform a directed line segment query (like a raycast) against the space calling @c func for each shape intersected.
	    Space.prototype.segmentQuery = function (start, end, layers, group, func) {
	        var helper = function helper(shape) {
	            var info;

	            if (!(shape.group && group === shape.group) && layers & shape.layers && (info = shape.segmentQuery(start, end))) {
	                func(shape, info.t, info.n);
	            }

	            return 1;
	        };

	        this.lock();{
	            this.staticShapes.segmentQuery(start, end, 1, helper);
	            this.activeShapes.segmentQuery(start, end, 1, helper);
	        }this.unlock(true);
	    };

	    /// Perform a directed line segment query (like a raycast) against the space and return the first shape hit.
	    /// Returns null if no shapes were hit.
	    Space.prototype.segmentQueryFirst = function (start, end, layers, group) {
	        var out = null;

	        var helper = function helper(shape) {
	            var info;

	            if (!(shape.group && group === shape.group) && layers & shape.layers && !shape.sensor && (info = shape.segmentQuery(start, end)) && (out === null || info.t < out.t)) {
	                out = info;
	            }

	            return out ? out.t : 1;
	        };

	        this.staticShapes.segmentQuery(start, end, 1, helper);
	        this.activeShapes.segmentQuery(start, end, out ? out.t : 1, helper);

	        return out;
	    };

	    /// Perform a fast rectangle query on the space calling @c func for each shape found.
	    /// Only the shape's bounding boxes are checked for overlap, not their full shape.
	    Space.prototype.bbQuery = function (bb, layers, group, func) {
	        var helper = function helper(shape) {
	            if (!(shape.group && group === shape.group) && layers & shape.layers && bbIntersects2(bb, shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t)) {
	                func(shape);
	            }
	        };

	        this.lock();{
	            this.activeShapes.query(bb, helper);
	            this.staticShapes.query(bb, helper);
	        }this.unlock(true);
	    };

	    /// Query a space for any shapes overlapping the given shape and call @c func for each shape found.
	    Space.prototype.shapeQuery = function (shape, func) {
	        var body = shape.body;

	        //var bb = (body ? shape.update(body.p, body.rot) : shape.bb);
	        if (body) {
	            shape.update(body.p, body.rot);
	        }
	        var bb = new BB(shape.bb_l, shape.bb_b, shape.bb_r, shape.bb_t);

	        //shapeQueryContext context = {func, data, false};
	        var anyCollision = false;

	        var helper = function helper(b) {
	            var a = shape;
	            // Reject any of the simple cases
	            if (a.group && a.group === b.group || !(a.layers & b.layers) || a === b) return;

	            var contacts;

	            // Shape 'a' should have the lower shape type. (required by collideShapes() )
	            if (a.collisionCode <= b.collisionCode) {
	                contacts = collideShapes(a, b);
	            } else {
	                contacts = collideShapes(b, a);
	                for (var i = 0; i < contacts.length; i++) {
	                    contacts[i].n = vneg(contacts[i].n);
	                }
	            }

	            if (contacts.length) {
	                anyCollision = !(a.sensor || b.sensor);

	                if (func) {
	                    var set = new Array(contacts.length);
	                    for (var i = 0; i < contacts.length; i++) {
	                        set[i] = new ContactPoint(contacts[i].p, contacts[i].n, contacts[i].dist);
	                    }

	                    func(b, set);
	                }
	            }
	        };

	        this.lock();{
	            this.activeShapes.query(bb, helper);
	            this.staticShapes.query(bb, helper);
	        }this.unlock(true);

	        return anyCollision;
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // **** Post Step Callback Functions

	    /// Schedule a post-step callback to be called when cpSpaceStep() finishes.
	    Space.prototype.addPostStepCallback = function (func) {
	        assertSoft(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. " + "Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");

	        this.postStepCallbacks.push(func);
	    };

	    Space.prototype.runPostStepCallbacks = function () {
	        // Don't cache length because post step callbacks may add more post step callbacks
	        // directly or indirectly.
	        for (var i = 0; i < this.postStepCallbacks.length; i++) {
	            this.postStepCallbacks[i]();
	        }
	        this.postStepCallbacks = [];
	    };

	    // **** Locking Functions

	    Space.prototype.lock = function () {
	        this.locked++;
	    };

	    Space.prototype.unlock = function (runPostStep) {
	        this.locked--;
	        assert(this.locked >= 0, "Internal Error: Space lock underflow.");

	        if (this.locked === 0 && runPostStep) {
	            var waking = this.rousedBodies;
	            for (var i = 0; i < waking.length; i++) {
	                this.activateBody(waking[i]);
	            }

	            waking.length = 0;

	            this.runPostStepCallbacks();
	        }
	    };

	    // **** Contact Buffer Functions

	    /* josephg:
	     *
	     * This code might be faster in JS than just allocating objects each time - I'm
	     * really not sure. If the contact buffer solution is used, there will also
	     * need to be changes in cpCollision.js to fill a passed array instead of creating
	     * new arrays each time.
	     *
	     * TODO: Benchmark me once chipmunk is working.
	     */

	    /*
	    var ContactBuffer = function(stamp, splice)
	    {
	        this.stamp = stamp;
	        // Contact buffers are a circular linked list.
	        this.next = splice ? splice.next : this;
	        this.contacts = [];
	    };
	    
	    Space.prototype.pushFreshContactBuffer = function()
	    {
	        var stamp = this.stamp;
	    
	        var head = this.contactBuffersHead;
	    
	        if(!head){
	            // No buffers have been allocated, make one
	            this.contactBuffersHead = new ContactBuffer(stamp, null);
	        } else if(stamp - head.next.stamp > this.collisionPersistence){
	            // The tail buffer is available, rotate the ring
	            var tail = head.next;
	            tail.stamp = stamp;
	            tail.contacts.length = 0;
	            this.contactBuffersHead = tail;
	        } else {
	            // Allocate a new buffer and push it into the ring
	            var buffer = new ContactBuffer(stamp, head);
	            this.contactBuffersHead = head.next = buffer;
	        }
	    };
	    
	    cpContact *
	    cpContactBufferGetArray(cpSpace *space)
	    {
	        if(space.contactBuffersHead.numContacts + CP_MAX_CONTACTS_PER_ARBITER > CP_CONTACTS_BUFFER_SIZE){
	            // contact buffer could overflow on the next collision, push a fresh one.
	            space.pushFreshContactBuffer();
	        }
	    
	        cpContactBufferHeader *head = space.contactBuffersHead;
	        return ((cpContactBuffer *)head)->contacts + head.numContacts;
	    }
	    
	    void
	    cpSpacePushContacts(cpSpace *space, int count)
	    {
	        cpAssertHard(count <= CP_MAX_CONTACTS_PER_ARBITER, "Internal Error: Contact buffer overflow!");
	        space.contactBuffersHead.numContacts += count;
	    }
	    
	    static void
	    cpSpacePopContacts(cpSpace *space, int count){
	        space.contactBuffersHead.numContacts -= count;
	    }
	    */

	    // **** Collision Detection Functions

	    /* Use this to re-enable object pools.
	    static void *
	    cpSpaceArbiterSetTrans(cpShape **shapes, cpSpace *space)
	    {
	        if(space.pooledArbiters.num == 0){
	            // arbiter pool is exhausted, make more
	            int count = CP_BUFFER_BYTES/sizeof(cpArbiter);
	            cpAssertHard(count, "Internal Error: Buffer size too small.");
	    
	            cpArbiter *buffer = (cpArbiter *)cpcalloc(1, CP_BUFFER_BYTES);
	            cpArrayPush(space.allocatedBuffers, buffer);
	    
	            for(int i=0; i<count; i++) cpArrayPush(space.pooledArbiters, buffer + i);
	        }
	    
	        return cpArbiterInit((cpArbiter *)cpArrayPop(space.pooledArbiters), shapes[0], shapes[1]);
	    }*/

	    // Callback from the spatial hash.
	    Space.prototype.makeCollideShapes = function () {
	        // It would be nicer to use .bind() or something, but this is faster.
	        var space_ = this;
	        return function (a, b) {
	            var space = space_;

	            // Reject any of the simple cases
	            if (
	            // BBoxes must overlap
	            //!bbIntersects(a.bb, b.bb)
	            !(a.bb_l <= b.bb_r && b.bb_l <= a.bb_r && a.bb_b <= b.bb_t && b.bb_b <= a.bb_t)
	            // Don't collide shapes attached to the same body.
	            || a.body === b.body
	            // Don't collide objects in the same non-zero group
	            || a.group && a.group === b.group
	            // Don't collide objects that don't share at least on layer.
	            || !(a.layers & b.layers)) return;

	            var handler = space.lookupHandler(a.collision_type, b.collision_type);

	            var sensor = a.sensor || b.sensor;
	            if (sensor && handler === defaultCollisionHandler) return;

	            // Shape 'a' should have the lower shape type. (required by cpCollideShapes() )
	            if (a.collisionCode > b.collisionCode) {
	                var temp = a;
	                a = b;
	                b = temp;
	            }

	            // Narrow-phase collision detection.
	            //cpContact *contacts = cpContactBufferGetArray(space);
	            //int numContacts = cpCollideShapes(a, b, contacts);
	            var contacts = collideShapes(a, b);
	            if (contacts.length === 0) return; // Shapes are not colliding.
	            //cpSpacePushContacts(space, numContacts);

	            // Get an arbiter from space.arbiterSet for the two shapes.
	            // This is where the persistant contact magic comes from.
	            var arbHash = hashPair(a.hashid, b.hashid);
	            var arb = space.cachedArbiters[arbHash];
	            if (!arb) {
	                arb = space.cachedArbiters[arbHash] = new Arbiter(a, b);
	            }

	            arb.update(contacts, handler, a, b);

	            // Call the begin function first if it's the first step
	            if (arb.state == 'first coll' && !handler.begin(arb, space)) {
	                arb.ignore(); // permanently ignore the collision until separation
	            }

	            if (
	            // Ignore the arbiter if it has been flagged
	            arb.state !== 'ignore' &&
	            // Call preSolve
	            handler.preSolve(arb, space) &&
	            // Process, but don't add collisions for sensors.
	            !sensor) {
	                space.arbiters.push(arb);
	            } else {
	                //cpSpacePopContacts(space, numContacts);

	                arb.contacts = null;

	                // Normally arbiters are set as used after calling the post-solve callback.
	                // However, post-solve callbacks are not called for sensors or arbiters rejected from pre-solve.
	                if (arb.state !== 'ignore') arb.state = 'normal';
	            }

	            // Time stamp the arbiter so we know it was used recently.
	            arb.stamp = space.stamp;
	        };
	    };

	    // Hashset filter func to throw away old arbiters.
	    Space.prototype.arbiterSetFilter = function (arb) {
	        var ticks = this.stamp - arb.stamp;

	        var a = arb.body_a,
	            b = arb.body_b;

	        // TODO should make an arbiter state for this so it doesn't require filtering arbiters for
	        // dangling body pointers on body removal.
	        // Preserve arbiters on sensors and rejected arbiters for sleeping objects.
	        // This prevents errant separate callbacks from happenening.
	        if ((a.isStatic() || a.isSleeping()) && (b.isStatic() || b.isSleeping())) {
	            return true;
	        }

	        // Arbiter was used last frame, but not this one
	        if (ticks >= 1 && arb.state != 'cached') {
	            arb.callSeparate(this);
	            arb.state = 'cached';
	        }

	        if (ticks >= this.collisionPersistence) {
	            arb.contacts = null;

	            //cpArrayPush(this.pooledArbiters, arb);
	            return false;
	        }

	        return true;
	    };

	    // **** All Important cpSpaceStep() Function

	    var updateFunc = function updateFunc(shape) {
	        var body = shape.body;
	        shape.update(body.p, body.rot);
	    };

	    /// Step the space forward in time by @c dt.
	    Space.prototype.step = function (dt) {
	        // don't step if the timestep is 0!
	        if (dt === 0) return;

	        assert(vzero.x === 0 && vzero.y === 0, "vzero is invalid");

	        this.stamp++;

	        var prev_dt = this.curr_dt;
	        this.curr_dt = dt;

	        var i;
	        var j;
	        var hash;
	        var bodies = this.bodies;
	        var constraints = this.constraints;
	        var arbiters = this.arbiters;

	        // Reset and empty the arbiter lists.
	        for (i = 0; i < arbiters.length; i++) {
	            var arb = arbiters[i];
	            arb.state = 'normal';

	            // If both bodies are awake, unthread the arbiter from the contact graph.
	            if (!arb.body_a.isSleeping() && !arb.body_b.isSleeping()) {
	                arb.unthread();
	            }
	        }
	        arbiters.length = 0;

	        this.lock();{
	            // Integrate positions
	            for (i = 0; i < bodies.length; i++) {
	                bodies[i].position_func(dt);
	            }

	            // Find colliding pairs.
	            //this.pushFreshContactBuffer();
	            this.activeShapes.each(updateFunc);
	            this.activeShapes.reindexQuery(this.collideShapes);
	        }this.unlock(false);

	        // Rebuild the contact graph (and detect sleeping components if sleeping is enabled)
	        this.processComponents(dt);

	        this.lock();{
	            // Clear out old cached arbiters and call separate callbacks
	            for (hash in this.cachedArbiters) {
	                if (!this.arbiterSetFilter(this.cachedArbiters[hash])) {
	                    delete this.cachedArbiters[hash];
	                }
	            }

	            // Prestep the arbiters and constraints.
	            var slop = this.collisionSlop;
	            var biasCoef = 1 - Math.pow(this.collisionBias, dt);
	            for (i = 0; i < arbiters.length; i++) {
	                arbiters[i].preStep(dt, slop, biasCoef);
	            }

	            for (i = 0; i < constraints.length; i++) {
	                var constraint = constraints[i];

	                constraint.preSolve(this);
	                constraint.preStep(dt);
	            }

	            // Integrate velocities.
	            var damping = Math.pow(this.damping, dt);
	            var gravity = this.gravity;
	            for (i = 0; i < bodies.length; i++) {
	                bodies[i].velocity_func(gravity, damping, dt);
	            }

	            // Apply cached impulses
	            var dt_coef = prev_dt === 0 ? 0 : dt / prev_dt;
	            for (i = 0; i < arbiters.length; i++) {
	                arbiters[i].applyCachedImpulse(dt_coef);
	            }

	            for (i = 0; i < constraints.length; i++) {
	                constraints[i].applyCachedImpulse(dt_coef);
	            }

	            // Run the impulse solver.
	            for (i = 0; i < this.iterations; i++) {
	                for (j = 0; j < arbiters.length; j++) {
	                    arbiters[j].applyImpulse();
	                }

	                for (j = 0; j < constraints.length; j++) {
	                    constraints[j].applyImpulse();
	                }
	            }

	            // Run the constraint post-solve callbacks
	            for (i = 0; i < constraints.length; i++) {
	                constraints[i].postSolve(this);
	            }

	            // run the post-solve callbacks
	            for (i = 0; i < arbiters.length; i++) {
	                arbiters[i].handler.postSolve(arbiters[i], this);
	            }
	        }this.unlock(true);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // These are utility routines to use when creating custom constraints.
	    // I'm not sure if this should be part of the private API or not.
	    // I should probably clean up the naming conventions if it is...

	    //#define J_MAX(constraint, dt) (((cpConstraint *)constraint)->maxForce*(dt))

	    // a and b are bodies.
	    var relative_velocity = function relative_velocity(a, b, r1, r2) {
	        //var v1_sum = vadd(a.v, vmult(vperp(r1), a.w));
	        var v1_sumx = a.vx + -r1.y * a.w;
	        var v1_sumy = a.vy + r1.x * a.w;

	        //var v2_sum = vadd(b.v, vmult(vperp(r2), b.w));
	        var v2_sumx = b.vx + -r2.y * b.w;
	        var v2_sumy = b.vy + r2.x * b.w;

	        //  return vsub(v2_sum, v1_sum);
	        return new Vect(v2_sumx - v1_sumx, v2_sumy - v1_sumy);
	    };

	    var normal_relative_velocity = function normal_relative_velocity(a, b, r1, r2, n) {
	        //return vdot(relative_velocity(a, b, r1, r2), n);
	        var v1_sumx = a.vx + -r1.y * a.w;
	        var v1_sumy = a.vy + r1.x * a.w;
	        var v2_sumx = b.vx + -r2.y * b.w;
	        var v2_sumy = b.vy + r2.x * b.w;

	        return vdot2(v2_sumx - v1_sumx, v2_sumy - v1_sumy, n.x, n.y);
	    };

	    /*
	    var apply_impulse = function(body, j, r){
	        body.v = vadd(body.v, vmult(j, body.m_inv));
	        body.w += body.i_inv*vcross(r, j);
	    };
	    
	    var apply_impulses = function(a, b, r1, r2, j)
	    {
	        apply_impulse(a, vneg(j), r1);
	        apply_impulse(b, j, r2);
	    };
	    */

	    var apply_impulse = function apply_impulse(body, jx, jy, r) {
	        //  body.v = body.v.add(vmult(j, body.m_inv));
	        body.vx += jx * body.m_inv;
	        body.vy += jy * body.m_inv;
	        //  body.w += body.i_inv*vcross(r, j);
	        body.w += body.i_inv * (r.x * jy - r.y * jx);
	    };

	    var apply_impulses = function apply_impulses(a, b, r1, r2, jx, jy) {
	        apply_impulse(a, -jx, -jy, r1);
	        apply_impulse(b, jx, jy, r2);
	    };

	    var apply_bias_impulse = function apply_bias_impulse(body, jx, jy, r) {
	        //body.v_bias = vadd(body.v_bias, vmult(j, body.m_inv));
	        body.v_biasx += jx * body.m_inv;
	        body.v_biasy += jy * body.m_inv;
	        body.w_bias += body.i_inv * vcross2(r.x, r.y, jx, jy);
	    };

	    /*
	    var apply_bias_impulses = function(a, b, r1, r2, j)
	    {
	        apply_bias_impulse(a, vneg(j), r1);
	        apply_bias_impulse(b, j, r2);
	    };*/

	    var k_scalar_body = function k_scalar_body(body, r, n) {
	        var rcn = vcross(r, n);
	        return body.m_inv + body.i_inv * rcn * rcn;
	    };

	    var k_scalar = function k_scalar(a, b, r1, r2, n) {
	        var value = k_scalar_body(a, r1, n) + k_scalar_body(b, r2, n);
	        assertSoft(value !== 0, "Unsolvable collision or constraint.");

	        return value;
	    };

	    // k1 and k2 are modified by the function to contain the outputs.
	    var k_tensor = function k_tensor(a, b, r1, r2, k1, k2) {
	        // calculate mass matrix
	        // If I wasn't lazy and wrote a proper matrix class, this wouldn't be so gross...
	        var k11, k12, k21, k22;
	        var m_sum = a.m_inv + b.m_inv;

	        // start with I*m_sum
	        k11 = m_sum;k12 = 0;
	        k21 = 0;k22 = m_sum;

	        // add the influence from r1
	        var a_i_inv = a.i_inv;
	        var r1xsq = r1.x * r1.x * a_i_inv;
	        var r1ysq = r1.y * r1.y * a_i_inv;
	        var r1nxy = -r1.x * r1.y * a_i_inv;
	        k11 += r1ysq;k12 += r1nxy;
	        k21 += r1nxy;k22 += r1xsq;

	        // add the influnce from r2
	        var b_i_inv = b.i_inv;
	        var r2xsq = r2.x * r2.x * b_i_inv;
	        var r2ysq = r2.y * r2.y * b_i_inv;
	        var r2nxy = -r2.x * r2.y * b_i_inv;
	        k11 += r2ysq;k12 += r2nxy;
	        k21 += r2nxy;k22 += r2xsq;

	        // invert
	        var determinant = k11 * k22 - k12 * k21;
	        assertSoft(determinant !== 0, "Unsolvable constraint.");

	        var det_inv = 1 / determinant;

	        k1.x = k22 * det_inv;k1.y = -k12 * det_inv;
	        k2.x = -k21 * det_inv;k2.y = k11 * det_inv;
	    };

	    var mult_k = function mult_k(vr, k1, k2) {
	        return new Vect(vdot(vr, k1), vdot(vr, k2));
	    };

	    var bias_coef = function bias_coef(errorBias, dt) {
	        return 1 - Math.pow(errorBias, dt);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // TODO: Comment me!

	    // a and b are bodies that the constraint applies to.
	    var Constraint = cp.Constraint = function (a, b) {
	        /// The first body connected to this constraint.
	        this.a = a;
	        /// The second body connected to this constraint.
	        this.b = b;

	        this.space = null;

	        this.next_a = null;
	        this.next_b = null;

	        /// The maximum force that this constraint is allowed to use.
	        this.maxForce = Infinity;
	        /// The rate at which joint error is corrected.
	        /// Defaults to pow(1 - 0.1, 60) meaning that it will
	        /// correct 10% of the error every 1/60th of a second.
	        this.errorBias = Math.pow(1 - 0.1, 60);
	        /// The maximum rate at which joint error is corrected.
	        this.maxBias = Infinity;
	    };

	    Constraint.prototype.activateBodies = function () {
	        if (this.a) this.a.activate();
	        if (this.b) this.b.activate();
	    };

	    /// These methods are overridden by the constraint itself.
	    Constraint.prototype.preStep = function (dt) {};
	    Constraint.prototype.applyCachedImpulse = function (dt_coef) {};
	    Constraint.prototype.applyImpulse = function () {};
	    Constraint.prototype.getImpulse = function () {
	        return 0;
	    };

	    /// Function called before the solver runs. This can be overridden by the user
	    /// to customize the constraint.
	    /// Animate your joint anchors, update your motor torque, etc.
	    Constraint.prototype.preSolve = function (space) {};

	    /// Function called after the solver runs. This can be overridden by the user
	    /// to customize the constraint.
	    /// Use the applied impulse to perform effects like breakable joints.
	    Constraint.prototype.postSolve = function (space) {};

	    Constraint.prototype.next = function (body) {
	        return this.a === body ? this.next_a : this.next_b;
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var PinJoint = cp.PinJoint = function (a, b, anchr1, anchr2) {
	        Constraint.call(this, a, b);

	        this.anchr1 = anchr1;
	        this.anchr2 = anchr2;

	        // STATIC_BODY_CHECK
	        var p1 = a ? vadd(a.p, vrotate(anchr1, a.rot)) : anchr1;
	        var p2 = b ? vadd(b.p, vrotate(anchr2, b.rot)) : anchr2;
	        this.dist = vlength(vsub(p2, p1));

	        assertSoft(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable.");

	        this.r1 = this.r2 = null;
	        this.n = null;
	        this.nMass = 0;

	        this.jnAcc = this.jnMax = 0;
	        this.bias = 0;
	    };

	    PinJoint.prototype = Object.create(Constraint.prototype);

	    PinJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        this.r1 = vrotate(this.anchr1, a.rot);
	        this.r2 = vrotate(this.anchr2, b.rot);

	        var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	        var dist = vlength(delta);
	        this.n = vmult(delta, 1 / (dist ? dist : Infinity));

	        // calculate mass normal
	        this.nMass = 1 / k_scalar(a, b, this.r1, this.r2, this.n);

	        // calculate bias velocity
	        var maxBias = this.maxBias;
	        this.bias = clamp(-bias_coef(this.errorBias, dt) * (dist - this.dist) / dt, -maxBias, maxBias);

	        // compute max impulse
	        this.jnMax = this.maxForce * dt;
	    };

	    PinJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        var j = vmult(this.n, this.jnAcc * dt_coef);
	        apply_impulses(this.a, this.b, this.r1, this.r2, j.x, j.y);
	    };

	    PinJoint.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;
	        var n = this.n;

	        // compute relative velocity
	        var vrn = normal_relative_velocity(a, b, this.r1, this.r2, n);

	        // compute normal impulse
	        var jn = (this.bias - vrn) * this.nMass;
	        var jnOld = this.jnAcc;
	        this.jnAcc = clamp(jnOld + jn, -this.jnMax, this.jnMax);
	        jn = this.jnAcc - jnOld;

	        // apply impulse
	        apply_impulses(a, b, this.r1, this.r2, n.x * jn, n.y * jn);
	    };

	    PinJoint.prototype.getImpulse = function () {
	        return Math.abs(this.jnAcc);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var SlideJoint = cp.SlideJoint = function (a, b, anchr1, anchr2, min, max) {
	        Constraint.call(this, a, b);

	        this.anchr1 = anchr1;
	        this.anchr2 = anchr2;
	        this.min = min;
	        this.max = max;

	        this.r1 = this.r2 = this.n = null;
	        this.nMass = 0;

	        this.jnAcc = this.jnMax = 0;
	        this.bias = 0;
	    };

	    SlideJoint.prototype = Object.create(Constraint.prototype);

	    SlideJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        this.r1 = vrotate(this.anchr1, a.rot);
	        this.r2 = vrotate(this.anchr2, b.rot);

	        var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	        var dist = vlength(delta);
	        var pdist = 0;
	        if (dist > this.max) {
	            pdist = dist - this.max;
	            this.n = vnormalize_safe(delta);
	        } else if (dist < this.min) {
	            pdist = this.min - dist;
	            this.n = vneg(vnormalize_safe(delta));
	        } else {
	            this.n = vzero;
	            this.jnAcc = 0;
	        }

	        // calculate mass normal
	        this.nMass = 1 / k_scalar(a, b, this.r1, this.r2, this.n);

	        // calculate bias velocity
	        var maxBias = this.maxBias;
	        this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);

	        // compute max impulse
	        this.jnMax = this.maxForce * dt;
	    };

	    SlideJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        var jn = this.jnAcc * dt_coef;
	        apply_impulses(this.a, this.b, this.r1, this.r2, this.n.x * jn, this.n.y * jn);
	    };

	    SlideJoint.prototype.applyImpulse = function () {
	        if (this.n.x === 0 && this.n.y === 0) return; // early exit

	        var a = this.a;
	        var b = this.b;

	        var n = this.n;
	        var r1 = this.r1;
	        var r2 = this.r2;

	        // compute relative velocity
	        var vr = relative_velocity(a, b, r1, r2);
	        var vrn = vdot(vr, n);

	        // compute normal impulse
	        var jn = (this.bias - vrn) * this.nMass;
	        var jnOld = this.jnAcc;
	        this.jnAcc = clamp(jnOld + jn, -this.jnMax, 0);
	        jn = this.jnAcc - jnOld;

	        // apply impulse
	        apply_impulses(a, b, this.r1, this.r2, n.x * jn, n.y * jn);
	    };

	    SlideJoint.prototype.getImpulse = function () {
	        return Math.abs(this.jnAcc);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    // Pivot joints can also be created with (a, b, pivot);
	    var PivotJoint = cp.PivotJoint = function (a, b, anchr1, anchr2) {
	        Constraint.call(this, a, b);

	        if (typeof anchr2 === 'undefined') {
	            var pivot = anchr1;

	            anchr1 = a ? a.world2Local(pivot) : pivot;
	            anchr2 = b ? b.world2Local(pivot) : pivot;
	        }

	        this.anchr1 = anchr1;
	        this.anchr2 = anchr2;

	        this.r1 = this.r2 = vzero;

	        this.k1 = new Vect(0, 0);this.k2 = new Vect(0, 0);

	        this.jAcc = vzero;

	        this.jMaxLen = 0;
	        this.bias = vzero;
	    };

	    PivotJoint.prototype = Object.create(Constraint.prototype);

	    PivotJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        this.r1 = vrotate(this.anchr1, a.rot);
	        this.r2 = vrotate(this.anchr2, b.rot);

	        // Calculate mass tensor. Result is stored into this.k1 & this.k2.
	        k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);

	        // compute max impulse
	        this.jMaxLen = this.maxForce * dt;

	        // calculate bias velocity
	        var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	        this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt) / dt), this.maxBias);
	    };

	    PivotJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
	    };

	    PivotJoint.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        var r1 = this.r1;
	        var r2 = this.r2;

	        // compute relative velocity
	        var vr = relative_velocity(a, b, r1, r2);

	        // compute normal impulse
	        var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
	        var jOld = this.jAcc;
	        this.jAcc = vclamp(vadd(this.jAcc, j), this.jMaxLen);

	        // apply impulse
	        apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
	    };

	    PivotJoint.prototype.getImpulse = function () {
	        return vlength(this.jAcc);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var GrooveJoint = cp.GrooveJoint = function (a, b, groove_a, groove_b, anchr2) {
	        Constraint.call(this, a, b);

	        this.grv_a = groove_a;
	        this.grv_b = groove_b;
	        this.grv_n = vperp(vnormalize(vsub(groove_b, groove_a)));
	        this.anchr2 = anchr2;

	        this.grv_tn = null;
	        this.clamp = 0;
	        this.r1 = this.r2 = null;

	        this.k1 = new Vect(0, 0);
	        this.k2 = new Vect(0, 0);

	        this.jAcc = vzero;
	        this.jMaxLen = 0;
	        this.bias = null;
	    };

	    GrooveJoint.prototype = Object.create(Constraint.prototype);

	    GrooveJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        // calculate endpoints in worldspace
	        var ta = a.local2World(this.grv_a);
	        var tb = a.local2World(this.grv_b);

	        // calculate axis
	        var n = vrotate(this.grv_n, a.rot);
	        var d = vdot(ta, n);

	        this.grv_tn = n;
	        this.r2 = vrotate(this.anchr2, b.rot);

	        // calculate tangential distance along the axis of r2
	        var td = vcross(vadd(b.p, this.r2), n);
	        // calculate clamping factor and r2
	        if (td <= vcross(ta, n)) {
	            this.clamp = 1;
	            this.r1 = vsub(ta, a.p);
	        } else if (td >= vcross(tb, n)) {
	            this.clamp = -1;
	            this.r1 = vsub(tb, a.p);
	        } else {
	            this.clamp = 0;
	            this.r1 = vsub(vadd(vmult(vperp(n), -td), vmult(n, d)), a.p);
	        }

	        // Calculate mass tensor
	        k_tensor(a, b, this.r1, this.r2, this.k1, this.k2);

	        // compute max impulse
	        this.jMaxLen = this.maxForce * dt;

	        // calculate bias velocity
	        var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	        this.bias = vclamp(vmult(delta, -bias_coef(this.errorBias, dt) / dt), this.maxBias);
	    };

	    GrooveJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        apply_impulses(this.a, this.b, this.r1, this.r2, this.jAcc.x * dt_coef, this.jAcc.y * dt_coef);
	    };

	    GrooveJoint.prototype.grooveConstrain = function (j) {
	        var n = this.grv_tn;
	        var jClamp = this.clamp * vcross(j, n) > 0 ? j : vproject(j, n);
	        return vclamp(jClamp, this.jMaxLen);
	    };

	    GrooveJoint.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        var r1 = this.r1;
	        var r2 = this.r2;

	        // compute impulse
	        var vr = relative_velocity(a, b, r1, r2);

	        var j = mult_k(vsub(this.bias, vr), this.k1, this.k2);
	        var jOld = this.jAcc;
	        this.jAcc = this.grooveConstrain(vadd(jOld, j));

	        // apply impulse
	        apply_impulses(a, b, this.r1, this.r2, this.jAcc.x - jOld.x, this.jAcc.y - jOld.y);
	    };

	    GrooveJoint.prototype.getImpulse = function () {
	        return vlength(this.jAcc);
	    };

	    GrooveJoint.prototype.setGrooveA = function (value) {
	        this.grv_a = value;
	        this.grv_n = vperp(vnormalize(vsub(this.grv_b, value)));

	        this.activateBodies();
	    };

	    GrooveJoint.prototype.setGrooveB = function (value) {
	        this.grv_b = value;
	        this.grv_n = vperp(vnormalize(vsub(value, this.grv_a)));

	        this.activateBodies();
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var defaultSpringForce = function defaultSpringForce(spring, dist) {
	        return (spring.restLength - dist) * spring.stiffness;
	    };

	    var DampedSpring = cp.DampedSpring = function (a, b, anchr1, anchr2, restLength, stiffness, damping) {
	        Constraint.call(this, a, b);

	        this.anchr1 = anchr1;
	        this.anchr2 = anchr2;

	        this.restLength = restLength;
	        this.stiffness = stiffness;
	        this.damping = damping;
	        this.springForceFunc = defaultSpringForce;

	        this.target_vrn = this.v_coef = 0;

	        this.r1 = this.r2 = null;
	        this.nMass = 0;
	        this.n = null;
	    };

	    DampedSpring.prototype = Object.create(Constraint.prototype);

	    DampedSpring.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        this.r1 = vrotate(this.anchr1, a.rot);
	        this.r2 = vrotate(this.anchr2, b.rot);

	        var delta = vsub(vadd(b.p, this.r2), vadd(a.p, this.r1));
	        var dist = vlength(delta);
	        this.n = vmult(delta, 1 / (dist ? dist : Infinity));

	        var k = k_scalar(a, b, this.r1, this.r2, this.n);
	        assertSoft(k !== 0, "Unsolvable this.");
	        this.nMass = 1 / k;

	        this.target_vrn = 0;
	        this.v_coef = 1 - Math.exp(-this.damping * dt * k);

	        // apply this force
	        var f_spring = this.springForceFunc(this, dist);
	        apply_impulses(a, b, this.r1, this.r2, this.n.x * f_spring * dt, this.n.y * f_spring * dt);
	    };

	    DampedSpring.prototype.applyCachedImpulse = function (dt_coef) {};

	    DampedSpring.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        var n = this.n;
	        var r1 = this.r1;
	        var r2 = this.r2;

	        // compute relative velocity
	        var vrn = normal_relative_velocity(a, b, r1, r2, n);

	        // compute velocity loss from drag
	        var v_damp = (this.target_vrn - vrn) * this.v_coef;
	        this.target_vrn = vrn + v_damp;

	        v_damp *= this.nMass;
	        apply_impulses(a, b, this.r1, this.r2, this.n.x * v_damp, this.n.y * v_damp);
	    };

	    DampedSpring.prototype.getImpulse = function () {
	        return 0;
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var defaultSpringTorque = function defaultSpringTorque(spring, relativeAngle) {
	        return (relativeAngle - spring.restAngle) * spring.stiffness;
	    };

	    var DampedRotarySpring = cp.DampedRotarySpring = function (a, b, restAngle, stiffness, damping) {
	        Constraint.call(this, a, b);

	        this.restAngle = restAngle;
	        this.stiffness = stiffness;
	        this.damping = damping;
	        this.springTorqueFunc = defaultSpringTorque;

	        this.target_wrn = 0;
	        this.w_coef = 0;
	        this.iSum = 0;
	    };

	    DampedRotarySpring.prototype = Object.create(Constraint.prototype);

	    DampedRotarySpring.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        var moment = a.i_inv + b.i_inv;
	        assertSoft(moment !== 0, "Unsolvable spring.");
	        this.iSum = 1 / moment;

	        this.w_coef = 1 - Math.exp(-this.damping * dt * moment);
	        this.target_wrn = 0;

	        // apply this torque
	        var j_spring = this.springTorqueFunc(this, a.a - b.a) * dt;
	        a.w -= j_spring * a.i_inv;
	        b.w += j_spring * b.i_inv;
	    };

	    // DampedRotarySpring.prototype.applyCachedImpulse = function(dt_coef){};

	    DampedRotarySpring.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        // compute relative velocity
	        var wrn = a.w - b.w; //normal_relative_velocity(a, b, r1, r2, n) - this.target_vrn;

	        // compute velocity loss from drag
	        // not 100% certain spring is derived correctly, though it makes sense
	        var w_damp = (this.target_wrn - wrn) * this.w_coef;
	        this.target_wrn = wrn + w_damp;

	        //apply_impulses(a, b, this.r1, this.r2, vmult(this.n, v_damp*this.nMass));
	        var j_damp = w_damp * this.iSum;
	        a.w += j_damp * a.i_inv;
	        b.w -= j_damp * b.i_inv;
	    };

	    // DampedRotarySpring.prototype.getImpulse = function(){ return 0; };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var RotaryLimitJoint = cp.RotaryLimitJoint = function (a, b, min, max) {
	        Constraint.call(this, a, b);

	        this.min = min;
	        this.max = max;

	        this.jAcc = 0;

	        this.iSum = this.bias = this.jMax = 0;
	    };

	    RotaryLimitJoint.prototype = Object.create(Constraint.prototype);

	    RotaryLimitJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        var dist = b.a - a.a;
	        var pdist = 0;
	        if (dist > this.max) {
	            pdist = this.max - dist;
	        } else if (dist < this.min) {
	            pdist = this.min - dist;
	        }

	        // calculate moment of inertia coefficient.
	        this.iSum = 1 / (1 / a.i + 1 / b.i);

	        // calculate bias velocity
	        var maxBias = this.maxBias;
	        this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);

	        // compute max impulse
	        this.jMax = this.maxForce * dt;

	        // If the bias is 0, the joint is not at a limit. Reset the impulse.
	        if (!this.bias) this.jAcc = 0;
	    };

	    RotaryLimitJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        var a = this.a;
	        var b = this.b;

	        var j = this.jAcc * dt_coef;
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    RotaryLimitJoint.prototype.applyImpulse = function () {
	        if (!this.bias) return; // early exit

	        var a = this.a;
	        var b = this.b;

	        // compute relative rotational velocity
	        var wr = b.w - a.w;

	        // compute normal impulse
	        var j = -(this.bias + wr) * this.iSum;
	        var jOld = this.jAcc;
	        if (this.bias < 0) {
	            this.jAcc = clamp(jOld + j, 0, this.jMax);
	        } else {
	            this.jAcc = clamp(jOld + j, -this.jMax, 0);
	        }
	        j = this.jAcc - jOld;

	        // apply impulse
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    RotaryLimitJoint.prototype.getImpulse = function () {
	        return Math.abs(joint.jAcc);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var RatchetJoint = cp.RatchetJoint = function (a, b, phase, ratchet) {
	        Constraint.call(this, a, b);

	        this.angle = 0;
	        this.phase = phase;
	        this.ratchet = ratchet;

	        // STATIC_BODY_CHECK
	        this.angle = (b ? b.a : 0) - (a ? a.a : 0);

	        this.iSum = this.bias = this.jAcc = this.jMax = 0;
	    };

	    RatchetJoint.prototype = Object.create(Constraint.prototype);

	    RatchetJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        var angle = this.angle;
	        var phase = this.phase;
	        var ratchet = this.ratchet;

	        var delta = b.a - a.a;
	        var diff = angle - delta;
	        var pdist = 0;

	        if (diff * ratchet > 0) {
	            pdist = diff;
	        } else {
	            this.angle = Math.floor((delta - phase) / ratchet) * ratchet + phase;
	        }

	        // calculate moment of inertia coefficient.
	        this.iSum = 1 / (a.i_inv + b.i_inv);

	        // calculate bias velocity
	        var maxBias = this.maxBias;
	        this.bias = clamp(-bias_coef(this.errorBias, dt) * pdist / dt, -maxBias, maxBias);

	        // compute max impulse
	        this.jMax = this.maxForce * dt;

	        // If the bias is 0, the joint is not at a limit. Reset the impulse.
	        if (!this.bias) this.jAcc = 0;
	    };

	    RatchetJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        var a = this.a;
	        var b = this.b;

	        var j = this.jAcc * dt_coef;
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    RatchetJoint.prototype.applyImpulse = function () {
	        if (!this.bias) return; // early exit

	        var a = this.a;
	        var b = this.b;

	        // compute relative rotational velocity
	        var wr = b.w - a.w;
	        var ratchet = this.ratchet;

	        // compute normal impulse
	        var j = -(this.bias + wr) * this.iSum;
	        var jOld = this.jAcc;
	        this.jAcc = clamp((jOld + j) * ratchet, 0, this.jMax * Math.abs(ratchet)) / ratchet;
	        j = this.jAcc - jOld;

	        // apply impulse
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    RatchetJoint.prototype.getImpulse = function (joint) {
	        return Math.abs(joint.jAcc);
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var GearJoint = cp.GearJoint = function (a, b, phase, ratio) {
	        Constraint.call(this, a, b);

	        this.phase = phase;
	        this.ratio = ratio;
	        this.ratio_inv = 1 / ratio;

	        this.jAcc = 0;

	        this.iSum = this.bias = this.jMax = 0;
	    };

	    GearJoint.prototype = Object.create(Constraint.prototype);

	    GearJoint.prototype.preStep = function (dt) {
	        var a = this.a;
	        var b = this.b;

	        // calculate moment of inertia coefficient.
	        this.iSum = 1 / (a.i_inv * this.ratio_inv + this.ratio * b.i_inv);

	        // calculate bias velocity
	        var maxBias = this.maxBias;
	        this.bias = clamp(-bias_coef(this.errorBias, dt) * (b.a * this.ratio - a.a - this.phase) / dt, -maxBias, maxBias);

	        // compute max impulse
	        this.jMax = this.maxForce * dt;
	    };

	    GearJoint.prototype.applyCachedImpulse = function (dt_coef) {
	        var a = this.a;
	        var b = this.b;

	        var j = this.jAcc * dt_coef;
	        a.w -= j * a.i_inv * this.ratio_inv;
	        b.w += j * b.i_inv;
	    };

	    GearJoint.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        // compute relative rotational velocity
	        var wr = b.w * this.ratio - a.w;

	        // compute normal impulse
	        var j = (this.bias - wr) * this.iSum;
	        var jOld = this.jAcc;
	        this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
	        j = this.jAcc - jOld;

	        // apply impulse
	        a.w -= j * a.i_inv * this.ratio_inv;
	        b.w += j * b.i_inv;
	    };

	    GearJoint.prototype.getImpulse = function () {
	        return Math.abs(this.jAcc);
	    };

	    GearJoint.prototype.setRatio = function (value) {
	        this.ratio = value;
	        this.ratio_inv = 1 / value;
	        this.activateBodies();
	    };

	    /* Copyright (c) 2007 Scott Lembcke
	     *
	     * Permission is hereby granted, free of charge, to any person obtaining a copy
	     * of this software and associated documentation files (the "Software"), to deal
	     * in the Software without restriction, including without limitation the rights
	     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	     * copies of the Software, and to permit persons to whom the Software is
	     * furnished to do so, subject to the following conditions:
	     *
	     * The above copyright notice and this permission notice shall be included in
	     * all copies or substantial portions of the Software.
	     *
	     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	     * SOFTWARE.
	     */

	    var SimpleMotor = cp.SimpleMotor = function (a, b, rate) {
	        Constraint.call(this, a, b);

	        this.rate = rate;

	        this.jAcc = 0;

	        this.iSum = this.jMax = 0;
	    };

	    SimpleMotor.prototype = Object.create(Constraint.prototype);

	    SimpleMotor.prototype.preStep = function (dt) {
	        // calculate moment of inertia coefficient.
	        this.iSum = 1 / (this.a.i_inv + this.b.i_inv);

	        // compute max impulse
	        this.jMax = this.maxForce * dt;
	    };

	    SimpleMotor.prototype.applyCachedImpulse = function (dt_coef) {
	        var a = this.a;
	        var b = this.b;

	        var j = this.jAcc * dt_coef;
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    SimpleMotor.prototype.applyImpulse = function () {
	        var a = this.a;
	        var b = this.b;

	        // compute relative rotational velocity
	        var wr = b.w - a.w + this.rate;

	        // compute normal impulse
	        var j = -wr * this.iSum;
	        var jOld = this.jAcc;
	        this.jAcc = clamp(jOld + j, -this.jMax, this.jMax);
	        j = this.jAcc - jOld;

	        // apply impulse
	        a.w -= j * a.i_inv;
	        b.w += j * b.i_inv;
	    };

	    SimpleMotor.prototype.getImpulse = function () {
	        return Math.abs(this.jAcc);
	    };
	})();

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _chipmunk = __webpack_require__(28);

	var _chipmunk2 = _interopRequireDefault(_chipmunk);

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _mathPointRotate = __webpack_require__(2);

	var _mathPointRotate2 = _interopRequireDefault(_mathPointRotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var or = _utils2.default.firstValuable; /** ********** *
	                                         *
	                                         * Connect chipmunk.js physics lib with Easycanvas.js
	                                         * - Standalone, as a plugin.
	                                         *
	                                         * ********** **/

	var inBrowser = typeof window !== 'undefined';

	var getValueFromArrayOrStatic = function getValueFromArrayOrStatic(physics, key, index) {
	    return or(physics[key][index], physics[key]);
	};

	var err = function err(msg) {
	    console.error('[Easycanvas-physics] ' + msg);
	};

	var cp = _chipmunk2.default;

	var init = function init(opt) {
	    if (!opt.physics) return;

	    var sprite = this;

	    sprite.physics = sprite.physics || {};

	    // sprite.physics.static = sprite.physics.static; // bool

	    sprite.physics.shape = sprite.physics.shape || [];
	    sprite.physics.gravity = or(sprite.physics.gravity, 2);
	    sprite.physics.accuracy = or(sprite.physics.accuracy, 2);
	    sprite.physics.friction = or(sprite.physics.friction, 0);
	    sprite.physics.elasticity = or(sprite.physics.elasticity, 0);
	    sprite.physics.group = or(sprite.physics.group, 0);
	    sprite.physics.collisionType = or(sprite.physics.collisionType, 0);

	    if (!sprite.physics.static && sprite.physics.shape.length) {
	        sprite.physics.mass = or(sprite.physics.mass, 0);

	        var defaultMoment = void 0;

	        if (sprite.physics.shape[0].length === 3) {
	            // circle shape
	            defaultMoment = cp.momentForCircle(sprite.physics.mass, 0, // r1
	            sprite.physics.shape[0][2], // r2
	            cp.vzero // offset
	            );
	        } else {
	            // poly shape
	            var verts = sprite.physics.shape.join(',').split(',').map(function (_num, index) {
	                var num = Number(_num);
	                // num += index % 2 ? sqSprite.getRect().ty : sqSprite.getRect().tx;
	                var res = index % 2 ? -num : num;
	                return res ? res : 0;
	            });

	            defaultMoment = cp.momentForPoly(sprite.physics.mass, verts, cp.vzero // offset
	            );
	        }

	        sprite.physics.moment = or(sprite.physics.moment, defaultMoment);
	    }

	    sprite.launch = launch.bind(sprite);

	    sprite.physicsOff = function () {
	        if (!sprite.$physics) return this;

	        sprite.$physics.inSpace = false;
	        if (sprite.$physics.body) {
	            sprite.$physics.space.removeBody(sprite.$physics.body);
	        }
	        sprite.$physics.shape.forEach(function (s) {
	            sprite.$physics.space.removeShape(s);
	        });

	        sprite.$physics = null;

	        return this;
	    };

	    sprite.physicsOn = function () {
	        var _this = this;

	        if (!this.$physics) {
	            spritePhysicsOn(this);
	        }

	        // 可能不是物理对象
	        if (!this.$physics) return this;

	        this.$physics.inSpace = true;

	        if (this.$physics.body) {
	            this.$physics.body.setPos(new cp.Vect(this.getRect().tx + this.getRect().tw / 2, -this.getRect().ty - this.getRect().th / 2));
	        }

	        this.$physics.body && this.$physics.space.addBody(this.$physics.body);
	        this.$physics.shape && this.$physics.shape.forEach(function (s) {
	            _this.$physics.space[_this.physics.static ? 'addStaticShape' : 'addShape'](s);
	        });

	        // debug TODO !
	        this.children.forEach(function (child) {
	            _this.physicsOn.call(child);
	        });

	        return this;
	    };

	    sprite.physicsSetVelocity = function (v) {
	        if (!sprite.$physics) return;

	        if (!sprite.$physics.body) {
	            if (false) {
	                err('Can not set velocity to static sprite.');
	            }
	            return this;
	        }

	        sprite.$physics.body.setVel({
	            x: v.x,
	            y: -v.y
	        });

	        return this;
	    };

	    sprite.physicsGetVelocity = function () {
	        if (!sprite.$physics) return;

	        if (!sprite.$physics.body) {
	            if (false) {
	                err('Can not get velocity of static sprite.');
	            }
	            return this;
	        }

	        var result = sprite.$physics.body.getVel();
	        result.y = -result.y;
	        return result;
	    };

	    sprite.physicsApplyImpulse = function () {
	        var j = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
	        var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };

	        if (!sprite.$physics) return;

	        if (!sprite.$physics.body) {
	            if (false) {
	                err('Can not apply impulse to static sprite.');
	            }
	            return this;
	        }

	        j.y = -j.y;
	        r.y = -r.y;

	        sprite.$physics.body.applyImpulse(j, r);
	        return this;
	    };

	    sprite.physicsGetAngelVelocity = function () {
	        if (!sprite.$physics) return;

	        if (!sprite.$physics.body) {
	            if (false) {
	                err('Can not get angel velocity of static sprite.');
	            }
	            return this;
	        }

	        return sprite.$physics.body.getAngVel();
	    };

	    sprite.physicsSetAngelVelocity = function (w) {
	        if (!sprite.$physics) return;

	        if (!sprite.$physics.body) {
	            if (false) {
	                err('Can not set angel velocity to static sprite.');
	            }
	            return this;
	        }

	        sprite.$physics.body.setVel(w);

	        return this;
	    };

	    sprite.physicsApplyForce = function (f) {
	        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };

	        if (!sprite.$physics) return this;

	        if (!sprite.$physics.body) return this;

	        sprite.$physics.body.applyForce({
	            x: f.x,
	            y: -f.y
	        }, {
	            x: f.x,
	            y: f.y
	        });

	        return this;
	    };

	    sprite.physicsResetForces = function () {
	        sprite.$physics.body.resetForces();

	        return this;
	    };

	    sprite.on('beforeTick', function (_time) {
	        if (!sprite.$physics || !sprite.physics) return;
	        if (sprite.physics.static) return;
	        if (sprite.$physics.inSpace === false) return;

	        sprite.$physics.body && cp2ec(sprite.$physics.body, sprite);
	    });
	};

	var xy2Vect = function xy2Vect(pos) {
	    // make a mark for debugging
	    // $Painter.add({
	    //     name: 'tmp1',
	    //     content: {
	    //         img: G,
	    //     },
	    //     style: {
	    //         tx: pos.x,
	    //         ty: pos.y,
	    //         tw: 10, th: 10,
	    //         zIndex: 999,
	    //     },
	    // });

	    return new cp.Vect(pos.x, pos.y ? -pos.y : 0);
	};

	var cp2ec = function cp2ec(body, sprite) {
	    var pos = body.getPos();
	    var vel = body.getVel();

	    sprite.style.rotate = body.a * 180 / Math.PI;
	    sprite.style.tx = pos.x;
	    sprite.style.ty = -pos.y;

	    if (sprite.style.locate === 'lt') {
	        sprite.style.tx -= sprite.getRect().tw / 2;
	        sprite.style.ty -= sprite.getRect().th / 2;
	    } else if (sprite.style.locate === 'ld') {
	        sprite.style.tx -= sprite.getRect().tw / 2;
	        sprite.style.ty += sprite.getRect().th / 2;
	    } else if (sprite.style.locate === 'rd') {
	        sprite.style.tx += sprite.getRect().tw / 2;
	        sprite.style.ty += sprite.getRect().th / 2;
	    } else if (sprite.style.locate === 'rt') {
	        sprite.style.tx += sprite.getRect().tw / 2;
	        sprite.style.ty -= sprite.getRect().th / 2;
	    }
	};

	function launch() {
	    var space = new cp.Space();

	    space.gravity = new cp.Vect(0, this.physics.gravity * -500);

	    if (false) {
	        if (!this.$canvas) {
	            err('Sprite must be added to an instance before lanuching physics.');
	        }
	    }

	    this.on('beforeTick', function (_time) {
	        var step = 0.01 * (this.$canvas.maxFps > 0 ? this.$canvas.maxFps : 60) / 60;
	        for (var i = 0; i < this.physics.accuracy; i++) {
	            space.step(step);
	        }
	    });

	    this.$physics = {
	        space: space
	    };

	    var handlerFactory = function handlerFactory(hookName) {
	        return function (cp) {
	            var a = cp.a.$sprite.trigger(hookName, cp.b.$sprite, cp.b.$sprite.physics.collisionType, cp, space);
	            var b = cp.b.$sprite.trigger(hookName, cp.a.$sprite, cp.a.$sprite.physics.collisionType, cp, space);
	            return !(a || b);
	        };
	    };

	    space.setDefaultCollisionHandler(handlerFactory('physicsCollisionBegin'), handlerFactory('physicsCollisionPreSolve'), handlerFactory('physicsCollisionPostSolve'), handlerFactory('physicsCollisionSeparate'));

	    space.$sprite = this;

	    return space;
	};

	function getSpacedParent(child) {
	    if (child.$parent) {
	        if (child.$parent.$physics && child.$parent.$physics.space) {
	            return child.$parent;
	        }
	        return getSpacedParent(child.$parent);
	    }
	    return null;
	}

	function spritePhysicsOn($sprite) {
	    var physics = $sprite.physics;
	    if (physics) {
	        var $space = getSpacedParent($sprite);
	        if (!$space) {
	            err('No physics container found launched.');
	            return;
	        }

	        var space = $space.$physics.space;

	        $sprite.$physics = {
	            space: space
	        };

	        if (!physics.shape.length) return;

	        var spriteShape = physics.shape;
	        var body = void 0;
	        var shapes = [];

	        if (!physics.static) {
	            body = new cp.Body(physics.mass, physics.moment);
	        }

	        spriteShape.forEach(function (s, index) {
	            var shape = void 0;

	            var spriteX = $sprite.getStyle('tx'),
	                spriteY = $sprite.getStyle('ty'),
	                spaceX = $space.getStyle('tx'),
	                spaceY = $space.getStyle('ty');

	            // [a, b, r]代表一个圆
	            // [[a1, b1], [a2, b2], [a3, b4]]代表多边形各个顶点
	            // [[a1, b1], [a2, b2]]代表一条线

	            if (s.length === 3 && !s[0].length) {
	                // 圆
	                var offset = body ? cp.vzero : {
	                    x: spriteX - spaceX,
	                    y: -spriteY + spaceY
	                };

	                shape = new cp.CircleShape(body || space.staticBody, s[2], offset);
	            } else if (s.length >= 3) {
	                // 多边形
	                var rx = $sprite.style.rx || $sprite.getRect().tx + $sprite.getRect().tw / 2;
	                var ry = $sprite.style.ry || $sprite.getRect().ty + $sprite.getRect().th / 2;

	                var verts = s.map(function (point) {
	                    var newPoint = (0, _mathPointRotate2.default)(point[0] + spriteX - spaceX, point[1] + spriteY + spaceY, rx - spaceX, ry + spaceY, $sprite.style.rotate || 0);

	                    // 多边形的shape是相对于物体坐标的相对定位，所以和sprite位置相减
	                    return [newPoint.x - spriteX, newPoint.y - spriteY];
	                }).join(',').split(',').map(function (_num, _index) {
	                    var num = Number(_num);
	                    var res = _index % 2 ? -num : num;
	                    return res ? res : 0;
	                });

	                var _offset = body ? cp.vzero : {
	                    x: spriteX - spaceX,
	                    y: -spriteY + spaceY
	                };

	                shape = new cp.PolyShape(body || space.staticBody, verts, _offset);
	            } else if (s.length === 2) {
	                // 线段构成
	                var _rx = $sprite.style.rx || $sprite.getRect().tx + $sprite.getRect().tw / 2;
	                var _ry = $sprite.style.ry || $sprite.getRect().ty + $sprite.getRect().th / 2;

	                var point1 = (0, _mathPointRotate2.default)(s[0][0] + spriteX - spaceX, s[0][1] + spriteY + spaceY, _rx - spaceX, _ry + spaceY, $sprite.style.rotate || 0);
	                var point2 = (0, _mathPointRotate2.default)(s[1][0] + spriteX - spaceX, s[1][1] + spriteY + spaceY, _rx - spaceX, _ry + spaceY, $sprite.style.rotate || 0);
	                point1.x -= spriteX;
	                point1.y -= spriteY;
	                point2.x -= spriteX;
	                point2.y -= spriteY;

	                shape = new cp.SegmentShape(space.staticBody, xy2Vect(point1), xy2Vect(point2), 0 // width
	                );
	            }

	            shape.setFriction(getValueFromArrayOrStatic(physics, 'friction', index));
	            shape.setElasticity(getValueFromArrayOrStatic(physics, 'elasticity', index));
	            shape.setCollisionType(getValueFromArrayOrStatic(physics, 'collisionType', index));
	            shape.group = getValueFromArrayOrStatic(physics, 'group', index);

	            shape.$sprite = $sprite;

	            shapes.push(shape);
	        });

	        $sprite.$physics.body = body;
	        $sprite.$physics.shape = shapes;

	        if (body) {
	            body.$sprite = $sprite;
	        }
	    }
	}

	if (inBrowser && window.Easycanvas) {
	    Easycanvas.extend(init);
	} else {
	    module.exports = init;
	}

/***/ })

/******/ })
});
;
>>>>>>> 44f9f938734159d0f29ab3a3aa631e48dcfabf92
