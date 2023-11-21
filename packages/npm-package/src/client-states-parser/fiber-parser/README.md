Fiber parser processes React fiber data drawn from the React Devtool to use it on
the Recoil debugger.
<br/>
It is very important to maintain the transformed data format for the debugger to work
consistently.
<br/>
So the fiber parser acts as a buffer between the React Devtools and the
Recoil debugger in terms of changes.
