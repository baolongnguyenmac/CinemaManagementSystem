//
<% for( let i = 0; i < occupiedSeatNames.length; i++ ) { %>
    <% if (seat == occupiedSeatNames[i]) { %>
        <div data-seat='<%= seat %>' class="seat occupied"><%= seat %></div>
    <% } %> <% else { %>
        <div data-seat='<%= seat %>' class="seat"><%= seat %></div>
    <% } %> 
<% } %>