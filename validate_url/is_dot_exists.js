function isDotExists(s)
{
    if(s.length<3) return false;

    var n=s.length;

    for(var i=0;i<n;i++)
    {
        if(s[i]=='.' && s[0]!='.' && s[n-1]!='.') return true;
    }

    return false;
}

module.exports = isDotExists;