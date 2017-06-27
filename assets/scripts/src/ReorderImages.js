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
