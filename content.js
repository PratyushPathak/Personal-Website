// CS 210 Study Guide - Content Population

document.addEventListener('DOMContentLoaded', function() {
    // NumPy content
    populateNumpyBasics();
    populateNumpyOperations();
    populateNumpyIndexing();
    populateNumpyExercises();
});

function populateNumpyBasics() {
    const section = document.getElementById('numpy-basics');
    section.innerHTML = `
        <h2 class="section-title numpy">🔢 NumPy Array Basics</h2>
        <p class="section-subtitle">Foundation concepts for working with NumPy arrays</p>

        <div class="content-card">
            <h3>Creating Arrays</h3>
            <div class="code-block"><pre><code>import numpy as np

# From a list
arr = np.array([1, 2, 3, 4])

# 2D array
arr2d = np.array([[1, 2, 3], [4, 5, 6]])

# Using arange
arr = np.arange(1, 10)  # [1, 2, 3, ..., 9]

# Using reshape
arr = np.arange(1, 13).reshape(3, 4)

# Random arrays
rand_arr = np.random.random((3, 4))  # floats 0-1
rand_int = np.random.randint(1, 10, (3, 4))  # integers 1-9

# Zeros, ones, empty
zeros = np.zeros((3, 4))
ones = np.ones((2, 3))
empty = np.empty((2, 2))  # uninitialized</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Array Properties</h3>
            <div class="code-block"><pre><code>arr = np.array([[1, 2, 3], [4, 5, 6]])

arr.shape      # (2, 3) - dimensions
arr.ndim       # 2 - number of dimensions
arr.size       # 6 - total elements
arr.dtype      # int64 - data type</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Type Casting with astype</h3>
            <p>Convert array from one dtype to another. <strong>Always creates a new array.</strong></p>
            <div class="code-block"><pre><code>floatarr = np.array([1, 2.5, 3])
intarr = floatarr.astype(int)  # [1, 2, 3] - truncates decimals

# Parse strings to numbers
num_strings = np.array(['1.5', '3.6', '-2.9'])
narr = num_strings.astype(float)  # [1.5, 3.6, -2.9]

# Cast to another array's dtype
farr = intarr.astype(floatarr.dtype)</code></pre></div>
            <div class="concept-box warning">
                <h4>⚠️ Important</h4>
                <p>Casting float to int <strong>truncates</strong> the decimal part, it doesn't round!</p>
            </div>
        </div>

        <div class="quick-ref">
            <h4>📋 Quick Reference - Array Creation</h4>
            <div class="quick-ref-grid">
                <div class="quick-ref-item"><code>np.array(list)</code> - from list</div>
                <div class="quick-ref-item"><code>np.arange(start, stop)</code> - range</div>
                <div class="quick-ref-item"><code>np.zeros((r,c))</code> - zeros</div>
                <div class="quick-ref-item"><code>np.ones((r,c))</code> - ones</div>
                <div class="quick-ref-item"><code>np.random.random((r,c))</code> - random floats</div>
                <div class="quick-ref-item"><code>np.random.randint(lo,hi,(r,c))</code> - random ints</div>
                <div class="quick-ref-item"><code>arr.reshape(r,c)</code> - reshape</div>
                <div class="quick-ref-item"><code>arr.astype(dtype)</code> - type cast</div>
            </div>
        </div>
    `;
}

function populateNumpyOperations() {
    const section = document.getElementById('numpy-operations');
    section.innerHTML = `
        <h2 class="section-title numpy">🔢 NumPy Operations & Functions</h2>
        <p class="section-subtitle">Mathematical operations, universal functions, and array manipulation</p>

        <div class="content-card">
            <h3>Element-wise Operations</h3>
            <p>Operations between arrays of the same shape apply element-wise:</p>
            <div class="code-block"><code>a = np.array([<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>])
b = np.array([<span class="number">4</span>, <span class="number">5</span>, <span class="number">6</span>])

a + b   <span class="comment"># [5, 7, 9]</span>
a * b   <span class="comment"># [4, 10, 18]</span>
a ** <span class="number">2</span>  <span class="comment"># [1, 4, 9]</span>
a > <span class="number">2</span>   <span class="comment"># [False, False, True]</span></code></div>
        </div>

        <div class="content-card">
            <h3>Universal Functions (ufuncs)</h3>
            <div class="code-block"><code><span class="comment"># Mathematical</span>
np.sqrt(arr)    <span class="comment"># square root</span>
np.exp(arr)     <span class="comment"># exponential</span>
np.log(arr)     <span class="comment"># natural log</span>
np.abs(arr)     <span class="comment"># absolute value</span>
np.power(arr, <span class="number">2</span>) <span class="comment"># power</span>

<span class="comment"># Binary functions</span>
np.maximum(a, b)  <span class="comment"># element-wise max</span>
np.minimum(a, b)  <span class="comment"># element-wise min</span>
np.greater(a, b)  <span class="comment"># element-wise comparison</span>

<span class="comment"># fmax/fmin - ignores NaN</span>
a = np.array([<span class="number">1</span>, <span class="number">2</span>, np.nan, <span class="number">4</span>])
b = np.array([<span class="number">2</span>, np.nan, <span class="number">3</span>, <span class="number">1</span>])
np.fmax(a, b)  <span class="comment"># [2, 2, 3, 4] - ignores NaN</span>
np.maximum(a, b)  <span class="comment"># [2, nan, nan, 4] - NaN propagates</span></code></div>
        </div>

        <div class="content-card">
            <h3>Aggregation Functions</h3>
            <div class="code-block"><code>arr = np.array([[<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>], [<span class="number">4</span>, <span class="number">5</span>, <span class="number">6</span>]])

arr.sum()       <span class="comment"># 21 - all elements</span>
arr.sum(axis=<span class="number">0</span>) <span class="comment"># [5, 7, 9] - sum each column</span>
arr.sum(axis=<span class="number">1</span>) <span class="comment"># [6, 15] - sum each row</span>

arr.mean()      <span class="comment"># mean of all</span>
arr.mean(axis=<span class="number">1</span>) <span class="comment"># mean of each row</span>

arr.max()       <span class="comment"># maximum value</span>
arr.min()       <span class="comment"># minimum value</span>
arr.std()       <span class="comment"># standard deviation</span>

arr.argmax()    <span class="comment"># index of max (flattened)</span>
arr.argmin()    <span class="comment"># index of min (flattened)</span>
arr.cumsum()    <span class="comment"># cumulative sum</span></code></div>
            <div class="concept-box">
                <h4>💡 axis Parameter</h4>
                <p><code>axis=0</code> operates along columns (down). <code>axis=1</code> operates along rows (across).</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Sorting</h3>
            <div class="code-block"><code>a = np.array([<span class="number">3</span>, <span class="number">-1</span>, <span class="number">2</span>, <span class="number">5</span>, <span class="number">15</span>])

<span class="comment"># np.sort - returns sorted copy, original unchanged</span>
np.sort(a)  <span class="comment"># [-1, 2, 3, 5, 15]</span>

<span class="comment"># a.sort() - sorts in place, modifies original!</span>
a.sort()

<span class="comment"># argsort - returns indices that would sort</span>
a = np.array([<span class="number">3</span>, <span class="number">-1</span>, <span class="number">2</span>, <span class="number">5</span>])
np.argsort(a)  <span class="comment"># [1, 2, 0, 3]</span>

<span class="comment"># 2D sorting - each row sorted individually</span>
arr2d = np.array([[<span class="number">3</span>, <span class="number">1</span>, <span class="number">2</span>], [<span class="number">6</span>, <span class="number">4</span>, <span class="number">5</span>]])
np.sort(arr2d)        <span class="comment"># sort each row</span>
np.sort(arr2d, axis=<span class="number">0</span>) <span class="comment"># sort each column</span></code></div>
        </div>

        <div class="content-card">
            <h3>np.where Function</h3>
            <p>Conditional selection: <code>np.where(condition, if_true, if_false)</code></p>
            <div class="code-block"><code>arr = np.array([<span class="number">-2</span>, <span class="number">3</span>, <span class="number">-1</span>, <span class="number">4</span>])

<span class="comment"># Replace negatives with -1, others with 1</span>
np.where(arr < <span class="number">0</span>, <span class="number">-1</span>, <span class="number">1</span>)  <span class="comment"># [-1, 1, -1, 1]</span>

<span class="comment"># Replace negatives with -1, keep others</span>
np.where(arr < <span class="number">0</span>, <span class="number">-1</span>, arr)  <span class="comment"># [-1, 3, -1, 4]</span>

<span class="comment"># Nested where</span>
new_arr = np.where(arr < <span class="number">0</span>, <span class="number">0</span>, np.where(arr > <span class="number">5</span>, <span class="number">5</span>, arr))</code></div>
        </div>

        <div class="content-card">
            <h3>Unique Values</h3>
            <div class="code-block"><code>scores = np.array([<span class="number">10</span>, <span class="number">9</span>, <span class="number">9</span>, <span class="number">8</span>, <span class="number">2</span>, <span class="number">3</span>])
np.unique(scores)  <span class="comment"># [2, 3, 8, 9, 10] - sorted unique values</span>

<span class="comment"># For 2D, unique is applied to flattened array</span></code></div>
        </div>

        <div class="content-card">
            <h3>Boolean Arrays</h3>
            <p>Boolean values coerce to 1 (True) and 0 (False):</p>
            <div class="code-block"><code>arr = np.array([<span class="number">1</span>, <span class="number">-5</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">-4</span>, <span class="number">6</span>])

<span class="comment"># Count positive values</span>
(arr > <span class="number">0</span>).sum()  <span class="comment"># 4</span>

<span class="comment"># Any/All</span>
(arr > <span class="number">0</span>).any()  <span class="comment"># True - at least one positive</span>
(arr > <span class="number">0</span>).all()  <span class="comment"># False - not all positive</span></code></div>
        </div>
    `;
}

function populateNumpyIndexing() {
    const section = document.getElementById('numpy-indexing');
    section.innerHTML = `
        <h2 class="section-title numpy">🔢 NumPy Indexing & Slicing</h2>
        <p class="section-subtitle">Accessing and manipulating array elements</p>

        <div class="content-card">
            <h3>Basic Indexing</h3>
            <div class="code-block"><code><span class="comment"># 1D indexing</span>
arr = np.array([<span class="number">10</span>, <span class="number">20</span>, <span class="number">30</span>, <span class="number">40</span>, <span class="number">50</span>])
arr[<span class="number">0</span>]     <span class="comment"># 10</span>
arr[<span class="number">-1</span>]    <span class="comment"># 50 (last element)</span>
arr[<span class="number">1</span>:<span class="number">4</span>]   <span class="comment"># [20, 30, 40] (slice)</span>

<span class="comment"># 2D indexing</span>
arr2d = np.array([[<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>], [<span class="number">4</span>, <span class="number">5</span>, <span class="number">6</span>], [<span class="number">7</span>, <span class="number">8</span>, <span class="number">9</span>]])
arr2d[<span class="number">0</span>]        <span class="comment"># [1, 2, 3] - first row</span>
arr2d[<span class="number">0</span>, <span class="number">1</span>]     <span class="comment"># 2 - element at row 0, col 1</span>
arr2d[<span class="number">0</span>][<span class="number">1</span>]     <span class="comment"># 2 - same as above</span></code></div>
        </div>

        <div class="content-card">
            <h3>Slicing 2D Arrays</h3>
            <div class="code-block"><code>arr2d = np.arange(<span class="number">1</span>, <span class="number">13</span>).reshape(<span class="number">3</span>, <span class="number">4</span>)
<span class="comment"># [[ 1,  2,  3,  4],
#  [ 5,  6,  7,  8],
#  [ 9, 10, 11, 12]]</span>

arr2d[:<span class="number">2</span>]        <span class="comment"># first 2 rows</span>
arr2d[:, <span class="number">1</span>]      <span class="comment"># second column</span>
arr2d[<span class="number">1</span>:, <span class="number">2</span>:]    <span class="comment"># rows 1+ and cols 2+</span>
arr2d[:, ::<span class="number">2</span>]    <span class="comment"># every other column</span></code></div>
        </div>

        <div class="content-card">
            <h3>Boolean/Fancy Indexing</h3>
            <div class="code-block"><code>arr = np.array([<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>])

<span class="comment"># Boolean indexing</span>
arr[arr > <span class="number">3</span>]  <span class="comment"># [4, 5] - elements > 3</span>

<span class="comment"># Fancy indexing with list</span>
arr[[<span class="number">0</span>, <span class="number">2</span>, <span class="number">4</span>]]  <span class="comment"># [1, 3, 5] - elements at indices 0, 2, 4</span>

<span class="comment"># 2D boolean indexing</span>
arr2d = np.array([[<span class="number">1</span>, <span class="number">2</span>], [<span class="number">3</span>, <span class="number">4</span>]])
arr2d[arr2d > <span class="number">2</span>]  <span class="comment"># [3, 4] - flattened result</span></code></div>
        </div>

        <div class="concept-box warning">
            <h4>⚠️ Slicing vs Copying</h4>
            <p>Slices are <strong>views</strong>, not copies! Modifying a slice modifies the original. Use <code>.copy()</code> to create a true copy.</p>
            <div class="code-block"><code>arr = np.array([<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>])
slice_view = arr[:<span class="number">2</span>]
slice_view[<span class="number">0</span>] = <span class="number">99</span>
<span class="comment"># arr is now [99, 2, 3]!</span>

<span class="comment"># Use copy() to avoid this</span>
slice_copy = arr[:<span class="number">2</span>].copy()</code></div>
        </div>
    `;
}

function populateNumpyExercises() {
    const section = document.getElementById('numpy-exercises');
    section.innerHTML = `
        <h2 class="section-title numpy">🔢 NumPy Exercises</h2>
        <p class="section-subtitle">Practice problems from lectures and recitations</p>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">1</span>
                <span class="exercise-title">Mean Normalization</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Write a function that replaces all NaN values in a 2D ndarray with zero, then performs mean normalization (subtract from all items of each row the mean value of that row).</p>
                <div class="code-block"><pre><code>X = np.array([[5, 6, np.nan, 7],
              [1, np.nan, 0, 5],
              [-1, 5, np.nan, 2]])</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-1">🔍 Reveal Answer</button>
                <div id="ans-numpy-1" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def mean_normalize(X):
    X = np.nan_to_num(X)  # replaces NaNs with 0
    Y = X - X.mean(axis=1, keepdims=True)
    return Y</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>np.nan_to_num()</code> replaces NaN with 0. <code>keepdims=True</code> maintains 2D shape so broadcasting works correctly. Without it, the mean result is 1D and subtraction fails.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">2</span>
                <span class="exercise-title">Quiz Statistics</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Given a 2D ndarray where rows are students and columns are quiz scores, compute a result array of size k×3 with max, min, and average for each quiz, plus the overall class average.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-2">🔍 Reveal Answer</button>
                <div id="ans-numpy-2" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def getStats(scores):
    res = np.empty((scores.shape[1], 3))
    res[:, 0] = np.max(scores, axis=0)
    res[:, 1] = np.min(scores, axis=0)
    res[:, 2] = np.average(scores, axis=0)
    return res, np.average(scores)</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>axis=0</code> computes along columns (each quiz). The result array stores [max, min, avg] for each column/quiz.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">3</span>
                <span class="exercise-title">Cycle Rows</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Write a function that cycles the rows of a 2D ndarray up by 1 (first row becomes last).</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-3">🔍 Reveal Answer</button>
                <div id="ans-numpy-3" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def rowcycle(ndarr):
    cycle = list(range(1, ndarr.shape[0])) + [0]
    return ndarr[cycle]

# Example: [1,2,0] for 3 rows → rows [1,2,0]</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Creates index list [1, 2, ..., n-1, 0] and uses fancy indexing to reorder rows.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">4</span>
                <span class="exercise-title">Standard Deviation (No std())</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Compute standard deviation of each row without using the std function.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-4">🔍 Reveal Answer</button>
                <div id="ans-numpy-4" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def stddev(arr):
    # 1. Subtract row means
    arr1 = arr - np.mean(arr, axis=1).reshape(arr.shape[0], 1)
    # 2. Square, sum, divide by N, sqrt
    arr1 = (arr1 ** 2).sum(axis=1) / arr.shape[1]
    return np.sqrt(arr1)</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Formula: σ = √(Σ(x - μ)² / N). Subtract mean, square, average, take square root.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">5</span>
                <span class="exercise-title">One-Hot Encoding</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Generate one-hot encodings for a list of categories.<br>Input: ['cat','camel','dog','cat'] → Output: [[0,1,0], [1,0,0], [0,0,1], [0,1,0]]</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-5">🔍 Reveal Answer</button>
                <div id="ans-numpy-5" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def one_hot_encoding(cats):
    categories = np.array(cats)
    unique_categories = np.unique(categories)
    
    # Map category to index
    cat_to_idx = {cat: idx for idx, cat in enumerate(unique_categories)}
    
    # Create empty array
    one_hot = np.zeros((categories.size, unique_categories.size), dtype=int)
    
    # Fill in 1s
    for i, cat in enumerate(categories):
        one_hot[i, cat_to_idx[cat]] = 1
    
    return unique_categories, one_hot</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">6</span>
                <span class="exercise-title">Replace Values with np.where</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Create a 5×3 array of random decimals between 5 and 10. Replace values &gt; 8 with 10, values &lt; 6 with 5.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-6">🔍 Reveal Answer</button>
                <div id="ans-numpy-6" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Create array
a = np.random.uniform(5, 10, size=(5, 3))

# Nested where
new_arr = np.where(a < 6, 5, np.where(a > 8, 10, a))</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p>Use nested <code>np.where</code>: first check &lt;6, then in the else case check &gt;8, otherwise keep original.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">7</span>
                <span class="exercise-title">Top 2 Largest Positions</span>
                <span class="exercise-source">PS8</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">From the 5×3 array, get the position (index) of the two largest numbers in each row.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-7">🔍 Reveal Answer</button>
                <div id="ans-numpy-7" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Get indices of top 2 in each row using argsort
# argsort gives ascending order, so take last 2
top2_idx = np.argsort(a, axis=1)[:, -2:]

# Or reverse to get descending order
top2_idx = np.argsort(a, axis=1)[:, ::-1][:, :2]</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>np.argsort()</code> returns indices that would sort the array. Taking the last 2 indices gives positions of largest values.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">8</span>
                <span class="exercise-title">Boolean Indexing & Counting</span>
                <span class="exercise-source">Lecture</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Given an array, count how many values are greater than 5, and replace all negative values with 0.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-8">🔍 Reveal Answer</button>
                <div id="ans-numpy-8" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>arr = np.array([1, -2, 7, -4, 8, 3])

# Count values > 5
count = np.sum(arr > 5)  # or (arr > 5).sum()
# Result: 2

# Replace negatives with 0
arr[arr < 0] = 0
# Result: [1, 0, 7, 0, 8, 3]

# Or using np.where
arr = np.where(arr < 0, 0, arr)</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">9</span>
                <span class="exercise-title">Sorting and Unique</span>
                <span class="exercise-source">Lecture</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find all unique values in descending order, and get the indices that would sort the original array.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-9">🔍 Reveal Answer</button>
                <div id="ans-numpy-9" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>arr = np.array([3, 1, 4, 1, 5, 9, 2, 6])

# Unique values in descending order
unique_desc = np.unique(arr)[::-1]
# Result: [9, 6, 5, 4, 3, 2, 1]

# Indices that would sort the array
sort_indices = np.argsort(arr)
# Result: [1, 3, 6, 0, 2, 4, 7, 5]</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">10</span>
                <span class="exercise-title">fmax and fmin with NaN</span>
                <span class="exercise-source">Lecture</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Compare two arrays element-wise, getting the maximum of each pair. Handle NaN values properly.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-numpy-10">🔍 Reveal Answer</button>
                <div id="ans-numpy-10" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>a = np.array([1, np.nan, 3, 4])
b = np.array([5, 2, np.nan, 1])

# np.maximum propagates NaN
np.maximum(a, b)  # [5, nan, nan, 4]

# np.fmax ignores NaN
np.fmax(a, b)  # [5, 2, 3, 4]

# np.fmin ignores NaN for minimum
np.fmin(a, b)  # [1, 2, 3, 1]</code></pre></div>
                </div>
            </div>
        </div>
    `;
}

// Continue in next part due to size...

