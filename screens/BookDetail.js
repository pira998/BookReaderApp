import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image, 
    ScrollView,Animated

} from 'react-native'


import { COLORS, FONTS, icons, SIZES } from '../constants'



function BookDetail({route,navigation}) {

    const [book,setBook] = useState(null)
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1)
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0)

    const indicator = new Animated.Value(0)

    useEffect(() => {
        let {book } = route.params
        setBook(book)
    },[book])

    const LineDivider = () =>{
        return (
            <View style={{
                width:1,
                paddingVertical:5,
            }}>
                <View style={{ flex:1,borderLeftColor:COLORS.lightGray2,borderWidth:1,}}>

                </View>
                
            </View>
        )
    }
    function renderBookInfoSection(){
        return(
            <View style={{flex:1}}>
                <ImageBackground

                    source={book.bookCover}
                    resizeMode="cover"
                    style={{
                        position:'absolute',
                        top:0,
                        bottom:0,
                        right:0,
                        left:0,
                    }}
                />
                {/* color overlay */}
                <View style={{
                    position:'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor:book.backgroundColor,

                }}>

                </View>

                {/* Navigation header */}
                <View style={{
                    flexDirection:'row',paddingHorizontal:SIZES.radius,height:50,alignItems:'flex-end'
                }}>
                <TouchableOpacity
                    style={{marginLeft:SIZES.base }}
                    onPress={()=>navigation.goBack()}>
                        <Image 
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width:25,
                                height:25,
                                tintColor:book.navTintColor,
                            }}
                            />
                           
                </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>Book Details</Text>
                    </View>

                <TouchableOpacity 
                        style={{marginRight:SIZES.base}}
                        onPress={() => console.log("Click More")}
                >
                    <Image 
                        source={icons.more_icon}
                        resizeMode="contain"
                        style={{ 
                            height:30,
                            width:30,
                            tintColor:book.navTintColor,
                            alignSelf:'flex-end',
                            
                        }}
                    />
                    
                </TouchableOpacity>

                </View>

                {/* Book Cover */}
                <View style={{flex:5,paddingTop:SIZES.padding,alignItems:"center"}}>
                        <Image
                            source={book.bookCover}
                            resizeMode="contain"
                            style={{
                                flex:1,
                                width:150,
                                height:"auto",

                            }}
                        />
                </View>

                {/* Book name and Author */}
                <View style={{ flex:1.8,alignItems:'center',justifyContent:"center"}}>
                        <Text style={{...FONTS.h2,color:book.navTintColor}}>{book.bookName}</Text>
                    <Text style={{ ...FONTS.body3, color: book.navTintColor }}>{book.author}</Text>
                </View>

                {/* Book info */}

                <View style={{
                    flexDirection:"row",
                    paddingVertical:20,
                    margin:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor:"rgba(0,0,0,0.3)"
                }}>
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center',}}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>{book.rating}</Text>
                        <Text style={{ ...FONTS.body4, color: book.navTintColor }}>Rating</Text>
                    </View>

                    <LineDivider/>

                    {/* Pages */}
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>{book.pageNo}</Text>
                        <Text style={{ ...FONTS.body4, color: book.navTintColor }}>No of Pages</Text>
                    </View>
                    <LineDivider />
                    {/* Languages */}

                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>{book.language}</Text>
                        <Text style={{ ...FONTS.body4, color: book.navTintColor }}>Language</Text>
                    </View>

                </View>

            </View>)
    }

    function renderBookDescription(){

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight? scrollViewVisibleHeight * scrollViewVisibleHeight/scrollViewWholeHeight:scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight-indicatorSize:1
        return(
                <View style ={{flex:1,flexDirection:"row",padding:SIZES.padding}}>
                <View style={{width:4,heigh:"100%",backgroundColor:COLORS.gray1}}>
                    <Animated.View
                        style={{
                            width:4,
                            height:indicatorSize,
                            backgroundColor:COLORS.lightGray4,
                            transform:[{
                                translateY:Animated.multiply(indicator,scrollViewVisibleHeight/scrollViewWholeHeight)
                                .interpolate({
                                    inputRange:[0,difference],
                                    outputRange:[0,difference],
                                    extraploate:'clamp'
                                })
                            }]
                        }}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{paddingLeft:SIZES.padding2}}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width,height)=>{
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({nativeEvent:{layout:{x,y,width,height}}})=>{
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={
                        Animated.event([{nativeEvent:{contentOffset:{y:indicator}}}],
                        {useNativeDriver:false}
                        )
                    }
                >
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>Description</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray, }}>{book.description}</Text>
                </ScrollView>
                </View>
            )   
    }

    function renderBottomButton(){
        return(
            <View style={{flex: 1,flexDirection:'row'}}>

            {/* Bookmark */}
            <TouchableOpacity 
                style={{
                    width: 60,
                    backgroundColor: COLORS.secondary,
                    marginLeft:SIZES.padding,
                    marginVertical:SIZES.base,
                    borderRadius:SIZES.radius,
                    alignItems:'center',
                    justifyContent:'center'}}
                onPress={()=>{
                    console.log("BookMark")
                }}
            >
                <Image
                    source={icons.bookmark_icon}
                    resizeMode="contain"
                    style={{
                        height: 25,
                        width: 25,

                    }}

                />
            </TouchableOpacity>
                {/* Start Reading */}
            <TouchableOpacity style={{ 
                flex:1,
                backgroundColor:COLORS.primary,
                marginHorizontal:SIZES.base,
                marginVertical:SIZES.base,
                borderRadius:SIZES.radius,
                alignItems:'center',
                justifyContent:'center',

            }}
            onPress={()=>console.log("Start Reading")}>
                <Text style={{...FONTS.h3,color:COLORS.white}}>Start Reading</Text>
            </TouchableOpacity>

            </View>
        )
    }
    
    if(book){
        return (
            <View style={{flex:1,backgroundColor:COLORS.black}}>
                    {/* book cover section  */}
                    <View style= {{flex:8,}}>
                            {renderBookInfoSection()}
                    </View>
                    {/* // Description */}
                    <View style={{flex:4}}>
                            {renderBookDescription()}
                    </View>
                    {/* Buttons */}
                    <View style={{height:70,marginBottom:30}}>
                            {renderBottomButton()}
                    </View>



            </View>
            
            
        )
    }
    else{
        return(<></>)
    }

    
}

export default BookDetail
