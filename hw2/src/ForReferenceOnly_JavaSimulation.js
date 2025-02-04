<p> This is visualized using a line chart where each line represents an attacker's 
					progress over time. Hovering over a point on the line shows the number of successful 
					attempts for that attacker at that timestep. On each timestep, the total number of 
					breaches is calculated by summing the values of all attackers at that timestep. 
					This is shown on the x-axis. </p>
					
				<p> Additionally, a histogram is created to represent the distribution of successes 
					among the attackers at the final timestep. The histogram shows how many attackers 
					achieved each possible number of successes, from 0 to n. The length of each bar in 
					the histogram is proportional to the number of attackers who achieved that number 
					of successes. </p>

				<p>The simulation is run using the following code snippet:</p>
					
				<pre>        
					<p>To put Photo Here</p>
      			</pre>
	  
				<p> This function initializes the simulation by creating an array of timesteps, where 
				each timestep is an array representing the state of each attacker. For each timestep,
		 		it iterates over the attackers and randomly decides if an attacker successfully 
		 		penetrates the server based on the probability p. If successful, the attacker's 
		 		count is incremented. </p>
		 
				<p> The mean, standard deviation, and mode are calculated 
				based on the final timestep's success values. To ensure numerical stability, 
				Knuth's compensated summation algorithm is used for the mean and standard 
				deviation calculations. </p>
				
				<p> The mean is calculated using a running sum with compensation for lost 
					low-order bits, which helps to minimize floating-point arithmetic errors.</p>
					
				<pre>      
					<p>To put Photo Here</p>
    			</pre>

				<p> The standard deviation is computed using compensation for both the mean 
					and the sum of squares. This way we have a more accurate variance 
					calculation, which becomes important for large datasets. </p>
					
				<pre>        
					<p>To put Photo Here</p>
      			</pre>
	  
	  			<p> The mode is determined by counting the frequency of each success value 
					and identifying the value(s) with the highest frequency. </p>
					
				<div class="input-group">
					<label for="n">Number of servers (n):</label>
					<input type="number" id="n" min="1" step="1">
				</div>
				
				<div class="input-group">
					<label for="m">Number of attackers (m):</label>
					<input type="number" id="m" min="1" step="1">
				</div>
				
				<div class="input-group">
					<label for="p">Probability of penetration (p):</label>
					<input type="number" id="p" min="0" max="1" step="0.01">
				</div>
					
				<div class="run-button-container">
					<button class="run-button"> Run Simulation </button> 
					Attention: the button is disabled for 3 seconds after clicking to prevent the canvas 
					crashing. 
				</div>

				<div class="charts-container">
					<canvas id="timestepsChart" style="box-sizing: border-box; 
					display: block; height: 550px; width: 379px;" width="474" height="687"></canvas>
					<canvas id="histogramChart" style="box-sizing: border-box; 
					display: block; height: 550px; width: 379px;" width="474" height="687"></canvas>
				</div>
