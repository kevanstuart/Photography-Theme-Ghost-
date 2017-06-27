/*!
 * Custom Javascript File
 * Author: Kevan Stuart
 * -------------------------------------------------------------------------------------*/


/*(function (window, document, undefined) {

	'use strict';


})(window, document);*/


/**
 * Event Listener for DOM Content Loaded
 */
document.addEventListener("DOMContentLoaded", formatGrid);


/**
 * Format Grid based on columns
 */
function formatGrid()
{

	// Initialize empty arrays
	var portraits  = [], 
		landscapes = [];

	// Get the Loop Element and children
	var loop  = document.getElementsByClassName('loop')[0];
	alert(loop);
	var list  = loop.children;

	// Add elements to either Portraits or Landscapes arrays
	for (var i = 0; i < list.length; i++)
	{
		if (isPortrait(list[i]))
		{
			portraits.push(list[i]); 
		}
		else
		{
			landscapes.push(list[i]);
		}
	}

	// Resize portrait elements
	if (portraits.length > 0)
	{
		resizePortraitItems(portraits, landscapes[0]);
	}

	// Add content in columns
	addContentToColumns(loop, portraits.length);
}


/**
 * Checks image height vs width to determine orientation
 */
function isPortrait(item)
{
	var img = item.getElementsByTagName('img')[0];
	return img.height > img.width;
}


/**
 * Loop through portrait images and resize in DOM
 */
function resizePortraitItems(portraits, reference)
{
	refHeight = Math.floor(reference.clientHeight / 5);
	portraits.forEach(function(item, index) {
		var itemImg    = item.getElementsByTagName('img')[0];
		var itemStyle  = item.currentStyle || window.getComputedStyle(item);
		var imgStyle   = itemImg.currentStyle || window.getComputedStyle(itemImg);

		item.style.maxHeight = (2 * refHeight) + 1 + 'px';
	});
}


/**
 * Determine columns, content in columns and add to Loop element
 */
function addContentToColumns(parent, nrPortrait)
{

	// Initialize variables for columns and row
	var columns = 5;
	var rows    = Math.ceil((parent.children.length+nrPortrait) / columns);
	
	for (var i = 0; i < columns; i++)
	{
		// Create empty column and add to parent
		column = createColumn();
		parent.appendChild(column);

		// Do not re-add columns
		if (!isColumn(parent.firstElementChild))
		{

			// Add elements based on number of rows
			j = 0;
			while (j < rows)
			{

				// Check a portrait image isn't last in the column and swap if it is
				if (j == (rows-2))
				{
					item = parent.firstElementChild;
					newItem = item.nextElementSibling;

					if (!isPortrait(item) && isPortrait(newItem))
					{
						parent.insertBefore(newItem, item);
					}
				}
				
				// Check again is element is a column
				if (isColumn(parent.firstElementChild))
				{
					break;
				}

				// Add element to column
				item = parent.firstElementChild;
				column.appendChild(item);
				j++;

				// Portrait image takes two rows
				if (isPortrait(item))
				{
					j++;
				}
			}
		}
	}
}


/**
 * Create an empty column with class 'loop-column'
 */
function createColumn()
{
	var el = document.createElement('div');
	el.setAttribute('class', 'loop-column');
	return el;
}


/**
 * Is the element a column created with class 'loop-column'
 */
function isColumn(item)
{
	return (item.nodeName == "DIV" && item.className == 'loop-column');
}

/*!
 * Script reorders elements to form a perfect grid on a page
 * as a full page element or a page sub-element
 * Author: Kevan Stuart
 * -------------------------------------------------------------------------------------*/

/**
 * Re-order image rows into columns
 */
var ImageRowsToColumns = {

    settings: 
    {
        rows   : 2,
        columns: 5
    },

    vars: 
    {
        loop      : document.getElementsByClassName('loop')[0],
        list      : document.getElementsByClassName('loop')[0].children,
        portraits : [],
        landscapes: [],
    },

    init: function() 
    {
        this.settings.columns = this.vars.loop.getAttribute('data-column');
        this.settings.rows    = Math.ceil(this.vars.list.length / this.settings.columns);
        this.runJS();
    },

    runJS: function() 
    {
        this.separateTypes();
        this.resizePortraits();
        this.addColumns();
        this.rowsToColumns();
    },

    /**
     * Checks image height vs width to determine orientation
     */
    isPortrait: function(el) 
    {
        var img = el.getElementsByTagName('img')[0];
        return img.height > img.width;
    },

    /**
     * Is the element a column created with class 'loop-column'
     */
    isColumn: function(el) 
    {
        return (el.nodeName == "DIV" && el.className == 'loop-column');
    },

    /**
     * Create an empty column with class 'loop-column'
     * and specific percentage width
     */
    createColumn: function() 
    {
        var el = document.createElement('div');
        el.setAttribute('class', 'loop-column');
        el.style.width = (100/this.settings.columns) + '%';
        return el;
    },

    /**
     * Separate the list into arrays of portrait images
     * and landscape images
     */
    separateTypes: function() 
    {
        listArr = Array.from(this.vars.list);
        listArr.forEach(function(item, index)
        {
            if (ImageRowsToColumns.isPortrait(item))
            {
                ImageRowsToColumns.vars.portraits.push(item);
            }
            else
            {
                ImageRowsToColumns.vars.landscapes.push(item);
            }
        });
    },

    /**
     * Resize the portrait images (if any)
     */
    resizePortraits: function() 
    {
        if (this.vars.portraits.length > 0)
        {
            reference = this.vars.landscapes[0];
            refHeight = Math.floor(reference.clientHeight / this.settings.columns);

            this.vars.portraits.forEach(function(item, index) {
                itemStyle  = item.currentStyle || window.getComputedStyle(item);
                item.style.maxHeight = (2 * refHeight) + 1 + 'px';
            });
        }
    },

    /**
     * Add the empty columns to the parent
     */
    addColumns: function()
    {
        parent = this.vars.loop; 
        for (var i = 0; i < this.settings.columns; i++)
        {
            // Create empty column and add to parent
            column = this.createColumn();
            parent.appendChild(column);
        }
    },

    /**
     * Add the rows to the application columns
     */
    rowsToColumns: function() 
    {
        parent   = this.vars.loop;
        children = this.vars.list;
        columns  = document.getElementsByClassName('loop-column');
        loopLength = children.length - columns.length;


        for (var i = 0; i < loopLength; i++)
        {
            item  = parent.firstElementChild;
            

            
            /*index = i % this.settings.columns;
            
            columns[index].appendChild(item);

            if (ImageRowsToColumns.isPortrait(item))
            {
                index++;
            }
            index++;*/
        }
    }
};

(function () {
    ImageRowsToColumns.init();
}());




/**
 * Event Listener for DOM Content Loaded
 */
//document.addEventListener("DOMContentLoaded", formatGrid);


/**
 * Determine columns, content in columns and add to Loop element
 */
/*function addContentToColumns(parent, nrPortrait)
{    
    for (var i = 0; i < columns; i++)
    {
        // Do not re-add columns
        if (!isColumn(parent.firstElementChild))
        {

            // Add elements based on number of rows
            j = 0;
            while (j < rows)
            {

                // Check a portrait image isn't last in the column and swap if it is
                if (j == (rows-2))
                {
                    item = parent.firstElementChild;
                    newItem = item.nextElementSibling;

                    if (!isPortrait(item) && isPortrait(newItem))
                    {
                        parent.insertBefore(newItem, item);
                    }
                }
            }
        }
    }
}*/

/*!
 * Script reorders elements to form a perfect grid on a page
 * as a full page element or a page sub-element
 * Author: Kevan Stuart
 * -------------------------------------------------------------------------------------*/

(function () {

	'use strict';

    FeedReader.init();
}());


/*(function (window, document, undefined) {

	'use strict';


})(window, document);*/


/**
 * Event Listener for DOM Content Loaded
 */
document.addEventListener("DOMContentLoaded", formatGrid);


/**
 * Format Grid based on columns
 */
function formatGrid()
{

	// Initialize empty arrays
	var portraits  = [], 
		landscapes = [];

	// Get the Loop Element and children
	var loop  = document.getElementsByClassName('loop')[0];
	alert(loop);
	var list  = loop.children;

	// Add elements to either Portraits or Landscapes arrays
	for (var i = 0; i < list.length; i++)
	{
		if (isPortrait(list[i]))
		{
			portraits.push(list[i]); 
		}
		else
		{
			landscapes.push(list[i]);
		}
	}

	// Resize portrait elements
	if (portraits.length > 0)
	{
		resizePortraitItems(portraits, landscapes[0]);
	}

	// Add content in columns
	addContentToColumns(loop, portraits.length);
}


/**
 * Checks image height vs width to determine orientation
 */
function isPortrait(item)
{
	var img = item.getElementsByTagName('img')[0];
	return img.height > img.width;
}


/**
 * Loop through portrait images and resize in DOM
 */
function resizePortraitItems(portraits, reference)
{
	refHeight = Math.floor(reference.clientHeight / 5);
	portraits.forEach(function(item, index) {
		var itemImg    = item.getElementsByTagName('img')[0];
		var itemStyle  = item.currentStyle || window.getComputedStyle(item);
		var imgStyle   = itemImg.currentStyle || window.getComputedStyle(itemImg);

		item.style.maxHeight = (2 * refHeight) + 1 + 'px';
	});
}


/**
 * Determine columns, content in columns and add to Loop element
 */
function addContentToColumns(parent, nrPortrait)
{

	// Initialize variables for columns and row
	var columns = 5;
	var rows    = Math.ceil((parent.children.length+nrPortrait) / columns);
	
	for (var i = 0; i < columns; i++)
	{
		// Create empty column and add to parent
		column = createColumn();
		parent.appendChild(column);

		// Do not re-add columns
		if (!isColumn(parent.firstElementChild))
		{

			// Add elements based on number of rows
			j = 0;
			while (j < rows)
			{

				// Check a portrait image isn't last in the column and swap if it is
				if (j == (rows-2))
				{
					item = parent.firstElementChild;
					newItem = item.nextElementSibling;

					if (!isPortrait(item) && isPortrait(newItem))
					{
						parent.insertBefore(newItem, item);
					}
				}
				
				// Check again is element is a column
				if (isColumn(parent.firstElementChild))
				{
					break;
				}

				// Add element to column
				item = parent.firstElementChild;
				column.appendChild(item);
				j++;

				// Portrait image takes two rows
				if (isPortrait(item))
				{
					j++;
				}
			}
		}
	}
}


/**
 * Create an empty column with class 'loop-column'
 */
function createColumn()
{
	var el = document.createElement('div');
	el.setAttribute('class', 'loop-column');
	return el;
}


/**
 * Is the element a column created with class 'loop-column'
 */
function isColumn(item)
{
	return (item.nodeName == "DIV" && item.className == 'loop-column');
}
