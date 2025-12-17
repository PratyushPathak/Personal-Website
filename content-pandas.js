// Pandas Content - Part 2

document.addEventListener('DOMContentLoaded', function() {
    populatePandasSeries();
    populatePandasDataFrame();
    populatePandasOperations();
    populatePandasGrouping();
    populatePandasExercises();
});

function populatePandasSeries() {
    const section = document.getElementById('pandas-series');
    section.innerHTML = `
        <h2 class="section-title pandas">🐼 Pandas Series</h2>
        <p class="section-subtitle">One-dimensional labeled array - foundation of Pandas</p>

        <div class="content-card">
            <h3>Creating a Series</h3>
            <div class="code-block"><pre><code>import pandas as pd
from pandas import Series

# From list with default index
ser = Series([10, 20, 30, 40])
# 0    10
# 1    20
# 2    30
# 3    40

# With custom index
ser = Series([10, 20, 30], index=['a', 'b', 'c'])

# From dictionary
udict = {'Rutgers': 55000, 'Princeton': 15000, 'MIT': 20000}
useries = Series(udict)  # keys become index</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Series Properties</h3>
            <div class="code-block"><pre><code>ser = Series([10, 20, 30], index=['a', 'b', 'c'], name='scores')

ser.index     # Index(['a', 'b', 'c'], dtype='object')
ser.values    # array([10, 20, 30]) - NumPy array
ser.name      # 'scores'
ser.dtype     # int64</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Accessing Elements</h3>
            <div class="code-block"><pre><code>ser = Series([1, 5, -2, 16], index=['a', 'b', 'x', 'd'])

# By label
ser['a']           # 1

# Multiple labels
ser[['x', 'a', 'b']]  # Series with those elements

# Boolean indexing (like NumPy)
ser[ser > 0]       # Elements > 0

# Check membership
'x' in ser         # True (checks index)</code></pre></div>
        </div>

        <div class="content-card">
            <h3>Common Series Methods</h3>
            <table class="data-table">
                <tr><th>Method</th><th>Description</th></tr>
                <tr><td><code>ser.head(n)</code></td><td>First n elements</td></tr>
                <tr><td><code>ser.tail(n)</code></td><td>Last n elements</td></tr>
                <tr><td><code>ser.mean()</code></td><td>Mean value</td></tr>
                <tr><td><code>ser.sum()</code></td><td>Sum of values</td></tr>
                <tr><td><code>ser.max() / min()</code></td><td>Max/Min value</td></tr>
                <tr><td><code>ser.median()</code></td><td>Median value</td></tr>
                <tr><td><code>ser.describe()</code></td><td>Summary statistics</td></tr>
                <tr><td><code>ser.value_counts()</code></td><td>Count unique values</td></tr>
                <tr><td><code>ser.apply(func)</code></td><td>Apply function to each element</td></tr>
                <tr><td><code>ser.map(dict/func)</code></td><td>Map values using dict or function</td></tr>
            </table>
        </div>

        <div class="content-card">
            <h3>value_counts() - Frequency Counts</h3>
            <div class="code-block"><pre><code>series = Series(['a', 'b', 'a', 'c', 'b', 'a'])
res = series.value_counts()
# a    3
# b    2  
# c    1
# Returns Series - index is values, values are counts
# Sorted in descending order

# Top 2 most frequent
res.index[:2]    # Index(['a', 'b'])
res.values[:2]   # array([3, 2])</code></pre></div>
        </div>

        <div class="content-card">
            <h3>apply() vs map()</h3>
            <div class="code-block"><pre><code>ser = Series([1, 2, 3, 4])

# apply - can pass extra args
ser.apply(lambda x: x**2)  # [1, 4, 9, 16]

def add_constant(x, const):
    return x + const

ser.apply(add_constant, args=(5,))  # [6, 7, 8, 9]

# map - for dictionary mapping
mapping = {'cat': 'kitten', 'dog': 'puppy'}
ser2 = Series(['cat', 'dog'])
ser2.map(mapping)  # ['kitten', 'puppy']</code></pre></div>
            <div class="concept-box">
                <h4>💡 Key Difference</h4>
                <p><code>map</code> cannot use functions with extra arguments. Use <code>map</code> for dictionary-based replacements, <code>apply</code> for complex functions.</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Handling NaN Values</h3>
            <div class="code-block"><pre><code>import numpy as np

ser = Series([1, 2, np.nan, 4])

# Detect
ser.isnull()    # [False, False, True, False]
ser.notnull()   # [True, True, False, True]

# Remove
ser.dropna()    # Series without NaN

# Fill
ser.fillna(0)           # Replace NaN with 0
ser.fillna(ser.mean())  # Replace with mean

# Forward/Backward fill
ser.ffill()  # Forward fill - use previous value
ser.bfill()  # Backward fill - use next value</code></pre></div>
            <div class="concept-box warning">
                <h4>⚠️ Important</h4>
                <p>These methods return NEW Series objects. Original is unchanged. Use <code>inplace=True</code> or reassign to modify.</p>
            </div>
        </div>

        <div class="content-card">
            <h3>reset_index()</h3>
            <p>Converts Series to DataFrame with index as a column:</p>
            <div class="code-block"><code>ser = Series({<span class="string">'A'</span>: <span class="number">25</span>, <span class="string">'B'</span>: <span class="number">31</span>, <span class="string">'C'</span>: <span class="number">26</span>}, name=<span class="string">'scores'</span>)
df = ser.reset_index()
<span class="comment">#   index  scores
# 0     A      25
# 1     B      31
# 2     C      26
# TYPE IS NOW DataFrame!</span></code></div>
        </div>
    `;
}

function populatePandasDataFrame() {
    const section = document.getElementById('pandas-dataframe');
    section.innerHTML = `
        <h2 class="section-title pandas">🐼 Pandas DataFrame Basics</h2>
        <p class="section-subtitle">Two-dimensional labeled data structure</p>

        <div class="content-card">
            <h3>Creating DataFrames</h3>
            <div class="code-block"><code><span class="keyword">from</span> pandas <span class="keyword">import</span> DataFrame
<span class="keyword">import</span> numpy <span class="keyword">as</span> np

<span class="comment"># 1. From dict of lists (most common)</span>
data = {<span class="string">'name'</span>: [<span class="string">'Alice'</span>, <span class="string">'Bob'</span>], <span class="string">'age'</span>: [<span class="number">25</span>, <span class="number">30</span>]}
df = DataFrame(data)

<span class="comment"># 2. From list of dicts</span>
data = [{<span class="string">'name'</span>: <span class="string">'Alice'</span>, <span class="string">'age'</span>: <span class="number">25</span>}, {<span class="string">'name'</span>: <span class="string">'Bob'</span>, <span class="string">'age'</span>: <span class="number">30</span>}]
df = DataFrame(data)

<span class="comment"># 3. From NumPy array</span>
arr = np.array([[<span class="number">1</span>, <span class="number">2</span>], [<span class="number">3</span>, <span class="number">4</span>]])
df = DataFrame(arr, columns=[<span class="string">'A'</span>, <span class="string">'B'</span>], index=[<span class="string">'row1'</span>, <span class="string">'row2'</span>])

<span class="comment"># 4. From CSV file</span>
df = pd.read_csv(<span class="string">'file.csv'</span>)

<span class="comment"># 5. From dict of dicts</span>
data = {<span class="string">'AZ'</span>: {<span class="number">2010</span>: <span class="number">6.6</span>, <span class="number">2015</span>: <span class="number">6.8</span>}, <span class="string">'VA'</span>: {<span class="number">2010</span>: <span class="number">7.9</span>}}
df = DataFrame(data)  <span class="comment"># outer keys = columns, inner keys = index</span></code></div>
        </div>

        <div class="content-card">
            <h3>DataFrame Properties & Info</h3>
            <div class="code-block"><code>df.shape      <span class="comment"># (rows, columns)</span>
df.columns    <span class="comment"># Column names</span>
df.index      <span class="comment"># Row labels/index</span>
df.values     <span class="comment"># Underlying NumPy array</span>
df.dtypes     <span class="comment"># Data type of each column</span>

df.head(n)    <span class="comment"># First n rows (default 5)</span>
df.tail(n)    <span class="comment"># Last n rows</span>
df.info()     <span class="comment"># Summary: dtypes, non-null counts, memory</span>
df.describe() <span class="comment"># Statistics for numeric columns</span></code></div>
        </div>

        <div class="content-card">
            <h3>Accessing Columns</h3>
            <p>Each column is a Series!</p>
            <div class="code-block"><code><span class="comment"># Single column - returns Series</span>
df[<span class="string">'name'</span>]      <span class="comment"># or df.name</span>

<span class="comment"># Multiple columns - returns DataFrame</span>
df[[<span class="string">'name'</span>, <span class="string">'age'</span>]]

<span class="comment"># Check column membership</span>
<span class="string">'name'</span> <span class="keyword">in</span> df.columns</code></div>
        </div>

        <div class="content-card">
            <h3>Accessing Rows with loc and iloc</h3>
            <div class="code-block"><code><span class="comment"># loc - label-based</span>
df.loc[<span class="number">0</span>]              <span class="comment"># Row at index 0 (if default index)</span>
df.loc[<span class="string">'row1'</span>]         <span class="comment"># Row with label 'row1'</span>
df.loc[<span class="number">1</span>:<span class="number">3</span>]            <span class="comment"># Rows 1-3 INCLUSIVE</span>
df.loc[[<span class="number">1</span>, <span class="number">3</span>]]          <span class="comment"># Non-contiguous rows</span>
df.loc[<span class="number">1</span>:<span class="number">3</span>, [<span class="string">'name'</span>]]  <span class="comment"># Rows + specific columns</span>

<span class="comment"># iloc - integer position based</span>
df.iloc[<span class="number">0</span>]              <span class="comment"># First row</span>
df.iloc[<span class="number">1</span>:<span class="number">3</span>]            <span class="comment"># Rows 1-2 (EXCLUDES end like NumPy)</span>
df.iloc[<span class="number">1</span>, <span class="number">0</span>]           <span class="comment"># Element at row 1, col 0</span>
df.iloc[<span class="number">2</span>:, [<span class="number">0</span>, <span class="number">2</span>]]    <span class="comment"># From row 2, cols 0 and 2</span></code></div>
            <div class="concept-box">
                <h4>💡 loc vs iloc</h4>
                <p><code>loc</code> includes end index in range. <code>iloc</code> excludes end (like NumPy slicing). <code>iloc</code> ONLY uses integers.</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Modifying Columns</h3>
            <div class="code-block"><code><span class="comment"># Add new column</span>
df[<span class="string">'new_col'</span>] = <span class="number">0</span>              <span class="comment"># All same value</span>
df[<span class="string">'new_col'</span>] = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>]       <span class="comment"># Different values</span>
df[<span class="string">'computed'</span>] = df[<span class="string">'a'</span>] > df[<span class="string">'b'</span>]  <span class="comment"># From other columns</span>

<span class="comment"># Rename columns</span>
df.columns = [<span class="string">'col1'</span>, <span class="string">'col2'</span>, <span class="string">'col3'</span>]  <span class="comment"># Assigns new names!</span>

<span class="comment"># Delete column</span>
<span class="keyword">del</span> df[<span class="string">'column_name'</span>]
<span class="comment"># or</span>
df.drop([<span class="string">'col'</span>], axis=<span class="number">1</span>)  <span class="comment"># returns new df</span></code></div>
            <div class="concept-box warning">
                <h4>⚠️ Warning</h4>
                <p>Changing <code>df.columns</code> assigns NEW names, it does NOT rearrange columns!</p>
            </div>
        </div>

        <div class="content-card">
            <h3>Modifying Rows</h3>
            <div class="code-block"><code><span class="comment"># Add row using loc</span>
df.loc[<span class="number">2020</span>] = [<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>]

<span class="comment"># Delete rows</span>
df.drop(<span class="number">2</span>)              <span class="comment"># Drop row with index 2</span>
df.drop([<span class="number">1</span>, <span class="number">3</span>])         <span class="comment"># Drop multiple</span>
df.drop(<span class="function">range</span>(<span class="number">1</span>, <span class="number">4</span>))    <span class="comment"># Drop range</span>

<span class="comment"># Note: drop returns new df, original unchanged</span></code></div>
        </div>

        <div class="content-card">
            <h3>Transpose</h3>
            <div class="code-block"><code>df.T  <span class="comment"># Swap rows and columns</span>
<span class="comment"># Returns new df, original unchanged</span></code></div>
        </div>
    `;
}

function populatePandasOperations() {
    const section = document.getElementById('pandas-operations');
    section.innerHTML = `
        <h2 class="section-title pandas">🐼 Pandas Operations & Methods</h2>
        <p class="section-subtitle">Data manipulation, filtering, and transformations</p>

        <div class="content-card">
            <h3>Handling NaN in DataFrames</h3>
            <div class="code-block"><code><span class="comment"># Drop rows with any NaN</span>
df.dropna()

<span class="comment"># Drop columns with any NaN</span>
df.dropna(axis=<span class="number">1</span>)

<span class="comment"># Drop rows/cols where ALL values are NaN</span>
df.dropna(how=<span class="string">'all'</span>)
df.dropna(how=<span class="string">'all'</span>, axis=<span class="number">1</span>)

<span class="comment"># Fill NaN</span>
df.fillna(<span class="number">0</span>)                <span class="comment"># All with 0</span>
df.fillna({<span class="number">1</span>: <span class="number">2.5</span>, <span class="number">2</span>: <span class="number">1.5</span>}) <span class="comment"># Different per column</span>

<span class="comment"># Forward/backward fill</span>
df.ffill()  <span class="comment"># Fill down columns</span>
df.bfill()  <span class="comment"># Fill up columns</span>
df.ffill(axis=<span class="number">1</span>)  <span class="comment"># Fill across rows</span>

<span class="comment"># Fill specific column</span>
df[<span class="string">'col'</span>] = df[<span class="string">'col'</span>].fillna(df[<span class="string">'col'</span>].mean())</code></div>
        </div>

        <div class="content-card">
            <h3>Boolean Filtering</h3>
            <div class="code-block"><code><span class="comment"># Single condition</span>
df[df[<span class="string">'age'</span>] > <span class="number">30</span>]

<span class="comment"># Multiple conditions - use & (and), | (or), ~ (not)</span>
df[(df[<span class="string">'age'</span>] > <span class="number">20</span>) & (df[<span class="string">'age'</span>] < <span class="number">40</span>)]

<span class="comment"># isin for multiple values</span>
df[df[<span class="string">'city'</span>].isin([<span class="string">'NY'</span>, <span class="string">'LA'</span>])]

<span class="comment"># Check for null</span>
df[df[<span class="string">'col'</span>].isnull()]
df[df[<span class="string">'col'</span>].notnull()]</code></div>
        </div>

        <div class="content-card">
            <h3>apply() on DataFrames</h3>
            <p>Applies function to each column (default) or row (axis=1):</p>
            <div class="code-block"><code><span class="comment"># Apply to each column (Series)</span>
df.apply(<span class="keyword">lambda</span> x: x.max() - x.min())

<span class="comment"># Apply to each row</span>
df.apply(<span class="keyword">lambda</span> x: x.sum(), axis=<span class="number">1</span>)

<span class="comment"># Custom function</span>
<span class="keyword">def</span> <span class="function">rndmean</span>(x):
    <span class="keyword">return</span> <span class="function">round</span>(x, <span class="number">2</span>) - x.mean().round(<span class="number">2</span>)

df.apply(rndmean)  <span class="comment"># x is each column</span></code></div>
        </div>

        <div class="content-card">
            <h3>map() on DataFrames</h3>
            <p>Applies function to EACH ELEMENT (not Series):</p>
            <div class="code-block"><code>df.map(<span class="keyword">lambda</span> x: x**<span class="number">2</span>)  <span class="comment"># Square each element</span>

<span class="comment"># Cannot use Series operations with map!</span>
df.map(<span class="keyword">lambda</span> x: x.mean())  <span class="comment"># ERROR! x is single value</span></code></div>
        </div>

        <div class="content-card">
            <h3>Aggregation Functions</h3>
            <div class="code-block"><code><span class="comment"># Column-wise (default)</span>
df.mean()       <span class="comment"># Mean of each column</span>
df.sum()
df.max()
df.min()
df.std()
df.median()

<span class="comment"># Row-wise</span>
df.mean(axis=<span class="number">1</span>)
df.cumsum(axis=<span class="number">1</span>)  <span class="comment"># Cumulative sum across row</span>

<span class="comment"># With NaN - skipna parameter</span>
df.mean(skipna=<span class="keyword">False</span>)  <span class="comment"># NaN if any NaN present</span>

<span class="comment"># argmax/argmin - index of max/min</span>
df[<span class="string">'col'</span>].argmax()  <span class="comment"># Index position of max</span></code></div>
        </div>

        <div class="content-card">
            <h3>Iterating Over Rows</h3>
            <div class="code-block"><code><span class="keyword">for</span> row <span class="keyword">in</span> df.iterrows():
    <span class="comment"># row is tuple: (index, Series)</span>
    idx = row[<span class="number">0</span>]
    data = row[<span class="number">1</span>]  <span class="comment"># Series with column names as index</span>
    <span class="function">print</span>(data[<span class="string">'name'</span>])</code></div>
        </div>

        <div class="content-card">
            <h3>Stacking DataFrames (concat)</h3>
            <div class="code-block"><code><span class="comment"># Vertical stack (combine rows)</span>
df_combined = pd.concat([df1, df2], axis=<span class="number">0</span>)  <span class="comment"># axis=0 is default</span>

<span class="comment"># Horizontal stack (combine columns)</span>
df_combined = pd.concat([df1, df2], axis=<span class="number">1</span>)</code></div>
        </div>

        <div class="content-card">
            <h3>Sorting</h3>
            <div class="code-block"><code><span class="comment"># Sort by column values</span>
df.sort_values(by=<span class="string">'age'</span>)
df.sort_values(by=<span class="string">'age'</span>, ascending=<span class="keyword">False</span>)
df.sort_values(by=[<span class="string">'col1'</span>, <span class="string">'col2'</span>])  <span class="comment"># Multiple columns</span>

<span class="comment"># Sort by index</span>
df.sort_index()</code></div>
        </div>

        <div class="content-card">
            <h3>pd.cut - Binning Values</h3>
            <p>Categorize numeric values into bins:</p>
            <div class="code-block"><code><span class="comment"># Create income categories 1-5 based on ranges</span>
df[<span class="string">'income_cat'</span>] = pd.cut(df[<span class="string">'income'</span>],
                          bins=[<span class="number">0</span>, <span class="number">1.5</span>, <span class="number">3.0</span>, <span class="number">4.5</span>, <span class="number">6.0</span>, np.inf],
                          labels=[<span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>])</code></div>
        </div>
    `;
}

function populatePandasGrouping() {
    const section = document.getElementById('pandas-grouping');
    section.innerHTML = `
        <h2 class="section-title pandas">🐼 Grouping & Aggregation</h2>
        <p class="section-subtitle">GroupBy operations for data analysis</p>

        <div class="content-card">
            <h3>Basic GroupBy</h3>
            <div class="code-block"><code><span class="comment"># Group by single column</span>
grouped = df.groupby(<span class="string">'state'</span>)

<span class="comment"># Apply aggregation</span>
grouped.sum()    <span class="comment"># Sum within each group</span>
grouped.mean()   <span class="comment"># Mean within each group</span>
grouped.count()  <span class="comment"># Count in each group</span>

<span class="comment"># Single statement</span>
df.groupby(<span class="string">'year'</span>).sum()

<span class="comment"># Reset index to make group column a regular column</span>
df.groupby(<span class="string">'year'</span>).sum().reset_index()</code></div>
        </div>

        <div class="content-card">
            <h3>Multi-level Grouping</h3>
            <div class="code-block"><code><span class="comment"># Group by multiple columns</span>
gdf = df.groupby([<span class="string">'Major'</span>, <span class="string">'Graduating Year'</span>]).count()

<span class="comment"># Access specific group</span>
gdf.loc[<span class="string">'Economics'</span>, <span class="number">2015</span>]

<span class="comment"># Get count for Economics in 2015</span>
gdf.loc[<span class="string">'Economics'</span>, <span class="number">2015</span>][<span class="string">'Student School'</span>]
<span class="comment"># or</span>
gdf.loc[<span class="string">'Economics'</span>, <span class="number">2015</span>].values[<span class="number">0</span>]</code></div>
        </div>

        <div class="content-card">
            <h3>Aggregation on Specific Columns</h3>
            <div class="code-block"><code><span class="comment"># Get mean of specific column per group</span>
df.groupby(<span class="string">'Manufacturer'</span>)[<span class="string">'MPG.city'</span>].mean()

<span class="comment"># Multiple aggregations</span>
df.groupby(<span class="string">'category'</span>).agg({
    <span class="string">'price'</span>: <span class="string">'mean'</span>,
    <span class="string">'quantity'</span>: <span class="string">'sum'</span>
})</code></div>
        </div>

        <div class="content-card">
            <h3>mode() - Most Frequent Value</h3>
            <div class="code-block"><code><span class="comment"># Find most popular major(s)</span>
df[<span class="string">'Major'</span>].mode()           <span class="comment"># Returns Series with mode(s)</span>
df[<span class="string">'Major'</span>].mode().values.tolist()  <span class="comment"># As list</span>

<span class="comment"># Using value_counts</span>
major_counts = df[<span class="string">'Major'</span>].value_counts()
major_counts[major_counts == major_counts.max()].index.tolist()</code></div>
        </div>

        <div class="quick-ref">
            <h4>📋 Quick Reference - GroupBy Aggregations</h4>
            <div class="quick-ref-grid">
                <div class="quick-ref-item"><code>.sum()</code> - sum</div>
                <div class="quick-ref-item"><code>.mean()</code> - average</div>
                <div class="quick-ref-item"><code>.count()</code> - count non-null</div>
                <div class="quick-ref-item"><code>.max()</code> - maximum</div>
                <div class="quick-ref-item"><code>.min()</code> - minimum</div>
                <div class="quick-ref-item"><code>.std()</code> - std dev</div>
                <div class="quick-ref-item"><code>.first()</code> - first value</div>
                <div class="quick-ref-item"><code>.last()</code> - last value</div>
            </div>
        </div>
    `;
}

function populatePandasExercises() {
    const section = document.getElementById('pandas-exercises');
    section.innerHTML = `
        <h2 class="section-title pandas">🐼 Pandas Exercises</h2>
        <p class="section-subtitle">Practice problems from lectures and recitations</p>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">1</span>
                <span class="exercise-title">Series reset_index</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">What does the following code print?</p>
                <div class="code-block"><pre><code>ser = Series({'A':25, 'B':31, 'C':26}, name='scores')
print(ser.reset_index().scores[1])</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your answer here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-1">🔍 Reveal Answer</button>
                <div id="ans-pandas-1" class="answer-container">
                    <div class="answer-label">Answer: 31</div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>reset_index()</code> converts Series to DataFrame with columns 'index' and 'scores'. <code>.scores[1]</code> accesses the second value in the scores column.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">2</span>
                <span class="exercise-title">DataFrame loc slicing</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">What does this print?</p>
                <div class="code-block"><pre><code>df = DataFrame(np.arange(1,9).reshape(4,2), index=['A','B','C','D'])
df.loc['B':'D'][0].max()</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your answer here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-2">🔍 Reveal Answer</button>
                <div id="ans-pandas-2" class="answer-container">
                    <div class="answer-label">Answer: 7</div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>loc['B':'D']</code> selects rows B, C, D (inclusive). <code>[0]</code> gets column 0 (values 3, 5, 7). <code>.max()</code> returns 7.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">3</span>
                <span class="exercise-title">Fill NaN with forward/backward fill</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">For the DataFrame below, which fillna method will make Yale an IVY (Yes) and NYU not an IVY (No)?</p>
                <div class="code-block"><pre><code>data = DataFrame({
    'Univ': ['USC', 'Yale', 'Harvard', 'UCLA', 'NCSU', 'NYU'],
    'IVY':  ['No', np.nan, 'Yes', np.nan, 'No', np.nan]
})</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your answer here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-3">🔍 Reveal Answer</button>
                <div id="ans-pandas-3" class="answer-container">
                    <div class="answer-label">Answer: None of the standard methods work</div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>bfill()</code> sets Yale='Yes' but NYU stays NaN. <code>ffill()</code> sets Yale='No' (wrong). <code>fillna('Yes')</code> sets both to Yes. Need manual assignment:</p>
                        <div class="code-block"><pre><code>data.loc[data['Univ'] == 'Yale', 'IVY'] = 'Yes'
data.loc[data['Univ'] == 'NYU', 'IVY'] = 'No'</code></pre></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">4</span>
                <span class="exercise-title">Keep Top 2 Frequent Values</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Given a Series, keep only the top 2 most frequent values and replace everything else with -1.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-4">🔍 Reveal Answer</button>
                <div id="ans-pandas-4" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>ser = Series(np.random.randint(1, 6, [12]))

# Get top 2 values
top2 = ser.value_counts().index[:2]

# Replace others with -1
ser[~ser.isin(top2)] = -1</code></pre></div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>value_counts().index[:2]</code> gets the two most frequent values. <code>~ser.isin(top2)</code> creates boolean mask for values NOT in top 2.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">5</span>
                <span class="exercise-title">Affordable Cars Filter</span>
                <span class="exercise-source">PS10</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Add an 'Affordable' column: Yes if Price ≤ 35 AND Horsepower > 150 AND Fuel.tank.capacity > 14 AND Passengers ≥ 4.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-5">🔍 Reveal Answer</button>
                <div id="ans-pandas-5" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>newcol = []
for id, row in df.iterrows():
    if row['Price'] > 35 or row['Passengers'] < 4:
        newcol.append('No')
    elif row['Horsepower'] < 150 or row['Fuel.tank.capacity'] < 14:
        newcol.append('No')
    else:
        newcol.append('Yes')

df['Affordable'] = np.array(newcol)</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">6</span>
                <span class="exercise-title">Switch DataFrame Columns</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Write a function to switch two columns in a DataFrame.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-6">🔍 Reveal Answer</button>
                <div id="ans-pandas-6" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>def switch_columns(df, col1, col2):
    colnames = df.columns.tolist()
    i1, i2 = colnames.index(col1), colnames.index(col2)
    colnames[i2], colnames[i1] = colnames[i1], colnames[i2]
    return df[colnames]</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">7</span>
                <span class="exercise-title">Words with 2+ Vowels</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Write code to pick words in a Series that contain at least 2 vowels.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-7">🔍 Reveal Answer</button>
                <div id="ans-pandas-7" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>from collections import Counter

ser = Series(['Apple', 'Orange', 'Plan', 'Python'])

def has_2_vowels(x):
    cnt = 0
    c = Counter(x.lower())
    for v in 'aeiou':
        cnt += c.get(v, 0)
    return cnt >= 2

ser[ser.map(has_2_vowels)]  # Apple, Orange</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">8</span>
                <span class="exercise-title">Extract Last 3 Rows</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Write 3 different ways to extract the last 3 rows of a DataFrame.</p>
                <div class="code-block"><pre><code>df = DataFrame(np.arange(1,25).reshape(4,6))</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-8">🔍 Reveal Answer</button>
                <div id="ans-pandas-8" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Method 1: tail()
df.tail(3)

# Method 2: iloc with negative indexing
df.iloc[-3:]

# Method 3: iloc with calculated start
df.iloc[len(df)-3:]

# Method 4: loc (if numeric index)
df.loc[1:]  # rows 1, 2, 3</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">9</span>
                <span class="exercise-title">Transpose and Access</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">What is the result of data.T[1:3][2][0]?</p>
                <div class="code-block"><pre><code>data = DataFrame({
   'id':[1,2,3,4,5],
   'Name': ['Alex', 'Amy', 'Allen', 'Alice', 'Abby'],
   'subject_id':['sub1','sub2','sub3','sub4','sub5']})</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your answer here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-9">🔍 Reveal Answer</button>
                <div id="ans-pandas-9" class="answer-container">
                    <div class="answer-label">Answer: 'Allen'</div>
                    <div class="explanation">
                        <div class="explanation-label">Explanation</div>
                        <p><code>.T</code> transposes (columns become rows). <code>[1:3]</code> selects rows 1-2 (Name, subject_id). <code>[2]</code> gets column 2. <code>[0]</code> gets first row (Name row) = 'Allen'</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">10</span>
                <span class="exercise-title">Capitalize First Letters</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Convert the first character of each word to uppercase.</p>
                <div class="code-block"><pre><code>ser = Series(['how', 'to easily', 'learn', 'spoken spanish'])</code></pre></div>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-10">🔍 Reveal Answer</button>
                <div id="ans-pandas-10" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Using title() - capitalizes first letter of each word
ser.apply(lambda x: x.title())
# Result: ['How', 'To Easily', 'Learn', 'Spoken Spanish']

# Or using str accessor
ser.str.title()</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">11</span>
                <span class="exercise-title">Fill NaN with Mean, Filter Divisible by 3</span>
                <span class="exercise-source">PS9</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Fill missing values with rounded mean, then get subset where numbers are divisible by 3.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-11">🔍 Reveal Answer</button>
                <div id="ans-pandas-11" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code>from numpy import nan as NA
nums = Series(np.random.randint(1, 10, 20))
# Some values set to NA...

# Fill with rounded mean
mean_val = round(nums.mean())
nums = nums.fillna(mean_val)

# Filter divisible by 3
divisible_by_3 = nums[nums % 3 == 0]</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">12</span>
                <span class="exercise-title">Average City MPG by Manufacturer</span>
                <span class="exercise-source">PS10</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Find the average city MPG of cars for each manufacturer.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-12">🔍 Reveal Answer</button>
                <div id="ans-pandas-12" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Using groupby
df.groupby('Manufacturer')['MPG.city'].mean()

# Or with agg for multiple stats
df.groupby('Manufacturer')['MPG.city'].agg(['mean', 'min', 'max'])</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">13</span>
                <span class="exercise-title">Count Missing Values</span>
                <span class="exercise-source">PS10</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Count the number of missing (NaN) values in each column. Which column has the maximum?</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-13">🔍 Reveal Answer</button>
                <div id="ans-pandas-13" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Count NaN per column
nan_counts = df.isnull().sum()

# Column with max missing
max_nan_col = nan_counts.idxmax()

# Or find all at once
df.isnull().sum().sort_values(ascending=False)</code></pre></div>
                </div>
            </div>
        </div>

        <div class="exercise-card">
            <div class="exercise-header">
                <span class="exercise-number">14</span>
                <span class="exercise-title">Replace NaN with Mean/Median</span>
                <span class="exercise-source">PS10</span>
            </div>
            <div class="exercise-body">
                <p class="exercise-problem">Replace missing values in Min.Price with mean and Max.Price with median.</p>
                <div class="answer-input-area">
                    <label>✏️ Your Answer:</label>
                    <textarea class="answer-textarea" placeholder="Write your solution here..."></textarea>
                </div>
                <button class="reveal-btn" data-answer="ans-pandas-14">🔍 Reveal Answer</button>
                <div id="ans-pandas-14" class="answer-container">
                    <div class="answer-label">Solution</div>
                    <div class="code-block"><pre><code># Fill Min.Price with mean
df['Min.Price'].fillna(df['Min.Price'].mean(), inplace=True)

# Fill Max.Price with median
df['Max.Price'].fillna(df['Max.Price'].median(), inplace=True)

# Alternative without inplace
df['Min.Price'] = df['Min.Price'].fillna(df['Min.Price'].mean())</code></pre></div>
                </div>
            </div>
        </div>
    `;
}

