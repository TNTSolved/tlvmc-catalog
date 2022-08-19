#BNagish_new {
	position: fixed;
	top: 6px;
	right: 6px;
	z-index: 999999999999;
}

#BNagishMenu_new {
	display: none;
	background: #e6e6e6;
	border-radius: 8px 0 8px 8px;
	padding: 0;
        color: #34495c;
	
	-webkit-box-shadow: -2px 2px 6px 2px rgb(50 50 50 / 20%);
	-moz-box-shadow:    -2px 2px 6px 2px rgb(50 50 50 / 20%);
	box-shadow:         -2px 2px 6px 2px rgb(50 50 50 / 20%);
}

#BNagishMenu_new a:not(.toggleBNagishSize) {
	display: block;
	padding: 0px 0px 0px 0px;
	padding-right: 16px;
	color: #171f73;
	font-size: 16px;
}

#BNagishMenu_new a:not(.toggleBNagishSize):hover {
	color: #1ABC9C;
}

#BNagishMenu_new strong {
	display: block;
	padding: 0px 0px 0px 0px;
	padding-right: 16px;
	font-size: 18px;
}

#BNagishMenu_new span {
	display: block;
	padding: 0 16px 12px;
	font-size: 14px;
	color: #333;
}

#toggleBNagish_new {
	background: #34495e;
	color: #FFF;
	background: transparent;
	color: transparent;
	padding: 7px 20px;
	display: block;
	font-size: 16px;
	-webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    border-radius: 7px;
	text-align: center;
	width: 151px;
    float: right;
    -o-transition: none;
    -ms-transition: none;
    -moz-transition: none;
    -webkit-transition: none;
    transition: none;
}

#BNagish_new_Close{
	background: #171f73;
}

#BNagish_new_Close:hover{
	background: #ea3d84;
}

#toggleBNagish_new #angle {
	margin-right: 5px;
}

.noBorderButtom{
    -webkit-border-radius: 7px !important;
    -webkit-border-bottom-right-radius: 0px !important;
    -webkit-border-bottom-left-radius: 0px !important;
    -moz-border-radius: 7px !important;
    -moz-border-radius-bottomright: 0px !important;
    -moz-border-radius-bottomleft: 0px !important;
    border-radius: 7px !important;
    border-bottom-right-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}

a.toggleBNagishSize {
    float: right;
    background: #ea3d84;
    border-radius: 50%;
    color: #fff;
    display: block;
    font-size: 16px;
    padding: 10px;
    font-weight: bold;
    width: 44px;
    margin-right: 6px;
    text-align: center;
    cursor: pointer;
}

a.toggleBNagishSize:hover {
    background: #171f73;
    color: #fff;
}

#BNagish_new a.active {
	font-weight: bold;
	background: #3e3e3e;
	color: #fff;
	border-radius: 5px;
	margin: 10px 14px;
}

#BNagish_new .webColors {
	margin: 10px 14px;
	padding: 10px 8px;
}

.Nagish-Inverted {
	filter: invert(1);
	-webkit-filter: invert(1);
	-moz-filter: invert(1);
	-o-filter: invert(1);
	-ms-filter: invert(1);
}

.Nagish-Grayscale {
	-webkit-filter: grayscale(100%);
	-moz-filter: grayscale(100%);
	filter: grayscale(100%);
}

/*--------------------------  SM ( max 992 ) --------------------------*/
@media(max-width:992px){
    #toggleBNagish_new{
		display: none;
	}
}


