
# coding: utf-8

# # Hello, TensorFlow
# ## A beginner-level, getting started, basic introduction to TensorFlow

# TensorFlow is a general-purpose system for graph-based computation. A typical use is machine learning. In this notebook, we'll introduce the basic concepts of TensorFlow using some simple examples.
# 
# TensorFlow gets its name from [tensors](https://en.wikipedia.org/wiki/Tensor), which are arrays of arbitrary dimensionality. A vector is a 1-d array and is known as a 1st-order tensor. A matrix is a 2-d array and a 2nd-order tensor. The "flow" part of the name refers to computation flowing through a graph. Training and inference in a neural network, for example, involves the propagation of matrix computations through many nodes in a computational graph.
# 
# When you think of doing things in TensorFlow, you might want to think of creating tensors (like matrices), adding operations (that output other tensors), and then executing the computation (running the computational graph). In particular, it's important to realize that when you add an operation on tensors, it doesn't execute immediately. Rather, TensorFlow waits for you to define all the operations you want to perform. Then, TensorFlow optimizes the computation graph, deciding how to execute the computation, before generating the data. Because of this, a tensor in TensorFlow isn't so much holding the data as a placeholder for holding the data, waiting for the data to arrive when a computation is executed.

# ## Adding two vectors in TensorFlow
# 
# Let's start with something that should be simple. Let's add two length four vectors (two 1st-order tensors):
# 
# $\begin{bmatrix} 1. & 1. & 1. & 1.\end{bmatrix} + \begin{bmatrix} 2. & 2. & 2. & 2.\end{bmatrix} = \begin{bmatrix} 3. & 3. & 3. & 3.\end{bmatrix}$

# In[2]:


from __future__ import print_function

import tensorflow as tf

with tf.Session():
    input1 = tf.constant([1.1, 2.0, 1.0, 1.0])
    input2 = tf.constant([2.0, 2.0, 2.0, 2.0])
    output = tf.add(input1, input2)
    result = output.eval()
    print("result: ", result)


# What we're doing is creating two vectors, [1.0, 1.0, 1.0, 1.0] and [2.0, 2.0, 2.0, 2.0], and then adding them. Here's equivalent code in raw Python and using numpy:

# In[ ]:


print([x + y for x, y in zip([1.0] * 4, [2.0] * 4)])


# In[ ]:


import numpy as np
x, y = np.full(4, 1.0), np.full(4, 2.0)
print("{} + {} = {}".format(x, y, x + y))


# ## Details of adding two vectors in TensorFlow
# 
# The example above of adding two vectors involves a lot more than it seems, so let's look at it in more depth.
# 
# >`import tensorflow as tf`
# 
# This import brings TensorFlow's public API into our IPython runtime environment.
# 
# >`with tf.Session():`
# 
# When you run an operation in TensorFlow, you need to do it in the context of a `Session`. A session holds the computation graph, which contains the tensors and the operations. When you create tensors and operations, they are not executed immediately, but wait for other operations and tensors to be added to the graph, only executing when finally requested to produce the results of the session. Deferring the execution like this provides additional opportunities for parallelism and optimization, as TensorFlow can decide how to combine operations and where to run them after TensorFlow knows about all the operations. 
# 
# >>`input1 = tf.constant([1.0, 1.0, 1.0, 1.0])`
# 
# >>`input2 = tf.constant([2.0, 2.0, 2.0, 2.0])`
# 
# The next two lines create tensors using a convenience function called `constant`, which is similar to numpy's `array` and numpy's `full`. If you look at the code for `constant`, you can see the details of what it is doing to create the tensor. In summary, it creates a tensor of the necessary shape and applies the constant operator to it to fill it with the provided values. The values to `constant` can be Python or numpy arrays. `constant` can take an optional shape parameter, which works similarly to numpy's `fill` if provided, and an optional name parameter, which can be used to put a more human-readable label on the operation in the TensorFlow operation graph.
# 
# >>`output = tf.add(input1, input2)`
# 
# You might think `add` just adds the two vectors now, but it doesn't quite do that. What it does is put the `add` operation into the computational graph. The results of the addition aren't available yet. They've been put in the computation graph, but the computation graph hasn't been executed yet.
# 
# >>`result = output.eval()`
# 
# >>`print result`
# 
# `eval()` is also slightly more complicated than it looks. Yes, it does get the value of the vector (tensor) that results from the addition. It returns this as a numpy array, which can then be printed. But, it's important to realize it also runs the computation graph at this point, because we demanded the output from the operation node of the graph; to produce that, it had to run the computation graph. So, this is the point where the addition is actually performed, not when `add` was called, as `add` just put the addition operation into the TensorFlow computation graph.

# ## Multiple operations
# 
# To use TensorFlow, you add operations on tensors that produce tensors to the computation graph, then execute that graph to run all those operations and calculate the values of all the tensors in the graph.
# 
# Here's a simple example with two operations:

# In[ ]:


import tensorflow as tf

with tf.Session():
    input1 = tf.constant(1.0, shape=[4])
    input2 = tf.constant(2.0, shape=[4])
    input3 = tf.constant(3.0, shape=[4])
    output = tf.add(tf.add(input1, input2), input3)
    result = output.eval()
    print(result)


# This version uses `constant` in a way similar to numpy's `fill`, specifying the optional shape and having the values copied out across it.
# 
# The `add` operator supports operator overloading, so you could try writing it inline as `input1 + input2` instead as well as experimenting with other operators.

# In[ ]:


with tf.Session():
    input1 = tf.constant(1.0, shape=[4])
    input2 = tf.constant(2.0, shape=[4])
    output = input1 + input2
    print(output.eval())


# ##  Adding two matrices

# Next, let's do something very similar, adding two matrices:
# 
# $\begin{bmatrix}
#   1. & 1. & 1. \\
#   1. & 1. & 1. \\
# \end{bmatrix} + 
# \begin{bmatrix}
#   1. & 2. & 3. \\
#   4. & 5. & 6. \\
# \end{bmatrix} = 
# \begin{bmatrix}
#   2. & 3. & 4. \\
#   5. & 6. & 7. \\
# \end{bmatrix}$

# In[ ]:


import tensorflow as tf
import numpy as np

with tf.Session():
    input1 = tf.constant(1.0, shape=[2, 3])
    input2 = tf.constant(np.reshape(np.arange(1.0, 7.0, dtype=np.float32), (2, 3)))
    output = tf.add(input1, input2)
    print(output.eval())


# Recall that you can pass numpy or Python arrays into `constant`.
# 
# In this example, the matrix with values from 1 to 6 is created in numpy and passed into `constant`, but TensorFlow also has `range`, `reshape`, and `tofloat` operators. Doing this entirely within TensorFlow could be more efficient if this was a very large matrix.
# 
# Try experimenting with this code a bit -- maybe modifying some of the values, using the numpy version, doing this using, adding another operation, or doing this using TensorFlow's `range` function.

# ##  Multiplying matrices

# Let's move on to matrix multiplication. This time, let's use a bit vector and some random values, which is a good step toward some of what we'll need to do for regression and neural networks.

# In[ ]:


#@test {"output": "ignore"}
import tensorflow as tf
import numpy as np

with tf.Session():
    input_features = tf.constant(np.reshape([1, 0, 0, 1], (1, 4)).astype(np.float32))
    weights = tf.constant(np.random.randn(4, 2).astype(np.float32))
    output = tf.matmul(input_features, weights)
    print("Input:")
    print(input_features.eval())
    print("Weights:")
    print(weights.eval())
    print("Output:")
    print(output.eval())


# Above, we're taking a 1 x 4 vector [1 0 0 1] and multiplying it by a 4 by 2 matrix full of random values from a normal distribution (mean 0, stdev 1). The output is a 1 x 2 matrix.
# 
# You might try modifying this example. Running the cell multiple times will generate new random weights and a new output. Or, change the input, e.g., to \[0 0 0 1]), and run the cell again. Or, try initializing the weights using the TensorFlow op, e.g., `random_normal`, instead of using numpy to generate the random weights.
# 
# What we have here is the basics of a simple neural network already. If we are reading in the input features, along with some expected output, and change the weights based on the error with the output each time, that's a neural network.

# ## Use of variables
# 
# Let's look at adding two small matrices in a loop, not by creating new tensors every time, but by updating the existing values and then re-running the computation graph on the new data. This happens a lot with machine learning models, where we change some parameters each time such as gradient descent on some weights and then perform the same computations over and over again.

# In[ ]:


#@test {"output": "ignore"}
import tensorflow as tf
import numpy as np

with tf.Session() as sess:
    # Set up two variables, total and weights, that we'll change repeatedly.
    total = tf.Variable(tf.zeros([1, 2]))
    weights = tf.Variable(tf.random_uniform([1,2]))

    # Initialize the variables we defined above.
    tf.global_variables_initializer().run()

    # This only adds the operators to the graph right now. The assignment
    # and addition operations are not performed yet.
    update_weights = tf.assign(weights, tf.random_uniform([1, 2], -1.0, 1.0))
    update_total = tf.assign(total, tf.add(total, weights))
  
    for _ in range(5):
        # Actually run the operation graph, so randomly generate weights and then
        # add them into the total. Order does matter here. We need to update
        # the weights before updating the total.
        sess.run(update_weights)
        sess.run(update_total)
    
        print(weights.eval(), total.eval())


# This is more complicated. At a high level, we create two variables and add operations over them, then, in a loop, repeatedly execute those operations. Let's walk through it step by step.
# 
# Starting off, the code creates two variables, `total` and `weights`. `total` is initialized to \[0, 0\] and `weights` is initialized to random values between -1 and 1.
# 
# Next, two assignment operators are added to the graph, one that updates weights with random values from [-1, 1], the other that updates the total with the new weights. Again, the operators are not executed here. In fact, this isn't even inside the loop. We won't execute these operations until the `eval` call inside the loop.
# 
# Finally, in the for loop, we run each of the operators. In each iteration of the loop, this executes the operators we added earlier, first putting random values into the weights, then updating the totals with the new weights. This call uses `eval` on the session; the code also could have called `eval` on the operators (e.g. `update_weights.eval`).
# 
# It can be a little hard to wrap your head around exactly what computation is done when. The important thing to remember is that computation is only performed on demand.
# 
# Variables can be useful in cases where you have a large amount of computation and data that you want to use over and over again with just a minor change to the input each time. That happens quite a bit with neural networks, for example, where you just want to update the weights each time you go through the batches of input data, then run the same operations over again.

# ## What's next?
# 
# This has been a gentle introduction to TensorFlow, focused on what TensorFlow is and the very basics of doing anything in TensorFlow. If you'd like more, the next tutorial in the series is Getting Started with TensorFlow, also available in the [notebooks directory](..).
