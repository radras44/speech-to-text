import reprlib
def describe_data (name,data) :
    print(f"\n--->{name} :")
    print(f"type: {type(data)}")
    if type(data) in [list,str,bytes] : 
        print(f"length: {len(data)}")
        print(reprlib.repr(f"sample: {data}"))
    print("\n")